import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { KAFKA_EVENTS, SERVICES } from 'nest-utils';
import { ClientKafka } from '@nestjs/microservices';
import { NewAccountCreatedEvent } from 'nest-dto';
import { Prisma } from '@prisma-client';
import { PrismaService } from 'prismaService';

import { Account } from './entities';
import { UpdateAccountInput } from './dto/update-account.input';

@Injectable()
export class AccountsService {
  constructor(
    private prisma: PrismaService,
    @Inject(SERVICES.ACCOUNTS_SERVICE.token)
    private readonly eventsClient: ClientKafka,
  ) {}

  async createAccountRecord(createAccountInput: Prisma.AccountCreateInput) {
    try {
      const { email, firstName, lastName, password, type } = createAccountInput;

      const createdUser = await this.prisma.account.create({
        data: {
          email,
          firstName,
          lastName,
          password,
          type,
        },
      });
      this.eventsClient.emit<string, NewAccountCreatedEvent>(
        KAFKA_EVENTS.ACCOUNTS_EVENTS.accountCreated,
        new NewAccountCreatedEvent({
          email: createdUser.email,
          id: createdUser.id,
          accountType: createdUser.type,
          firstName: createdUser.firstName,
          lastName: createdUser.lastName,
          username: createdUser.firstName,
        }),
      );
      return createdUser;
    } catch (error) {
      return null;
    }
  }

  async emailExists(email: string): Promise<boolean> {
    try {
      if (typeof email !== 'string')
        throw new BadRequestException('invalid email field');

      const account = await this.prisma.account.findUnique({
        where: {
          email,
        },
      });
      if (!account) return false;

      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getByEmail(email: string) {
    try {
      if (typeof email !== 'string')
        throw new BadRequestException('invalid email type');

      const account = await this.prisma.account.findUnique({
        where: {
          email,
        },
        rejectOnNotFound(error) {
          throw new NotFoundException(
            'could not find an account with this email, consider regisering a new account',
          );
        },
      });

      return account;
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll() {
    return this.prisma.account.findMany();
  }

  async findOne(id: string): Promise<Account> {
    const account = await this.prisma.account.findUnique({
      where: {
        id,
      },
    });

    return account;
  }

  async update(
    { ...rest }: UpdateAccountInput,
    userId: string,
  ): Promise<Partial<Account>> {
    try {
      const { password, ...res } = await this.prisma.account.update({
        where: {
          id: userId,
        },
        data: rest,
      });

      return res;
    } catch (err) {
      throw new BadRequestException('account was not found');
    }
  }

  async updatePassword(password: string, userId: string) {
    await this.prisma.account.update({
      where: {
        id: userId,
      },
      data: {
        password,
      },
    });
  }

  async updateStripeId(stripeId: string, userId: string) {
    try {
      const { password, ...res } = await this.prisma.account.update({
        where: {
          id: userId,
        },
        data: {
          stripeId,
        },
      });
      return res;
    } catch (err) {
      throw new BadRequestException('account was not found');
    }
  }

  async deleteAll() {
    try {
      await this.prisma.account.deleteMany();

      return true;
    } catch (err) {
      return false;
    }
  }

  async isSellerAccount(accountId: string): Promise<boolean> {
    const account = await this.prisma.account.findUnique({
      where: {
        id: accountId,
      },
      rejectOnNotFound() {
        throw new NotFoundException('account with the given id was not found');
      },
    });

    return account.type === 'seller';
  }

  async switchToSeller(userId: string) {
    try {
      await this.prisma.account.update({
        data: {
          type: 'seller',
        },
        where: {
          id: userId,
        },
      });
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
  async handleVerifyAccount(email: string) {
    await this.prisma.account.update({
      where: {
        email,
      },
      data: {
        verified: true,
      },
    });
  }
}
