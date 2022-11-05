import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAccountInput, UpdateAccountInput } from './dto';
import { Account } from './entities';
import { PrismaService } from 'src/prisma.service';
import { KAFKA_EVENTS, KAFKA_SERVICE_TOKEN, SERVICES } from 'nest-utils';
import { ClientKafka } from '@nestjs/microservices';
import { CreateShoppingCartEvent, NewAccountCreatedEvent } from 'nest-dto';
import { AccountType, Prisma } from '@prisma-client';

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
        }),
      );
      return createdUser;
    } catch (error) {
      console.log('err', error);
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
    id: string,
    updateAccountInput: Prisma.AccountUpdateInput,
  ): Promise<Partial<Account>> {
    try {
      console.log(id);
      const res = await this.prisma.account.update({
        where: {
          id,
        },
        data: updateAccountInput,
      });
      return res;
    } catch (err) {
      console.log(err);
      // throw new BadRequestException('account was not found');
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
      rejectOnNotFound(error) {
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
  async handleVerifiedAccount(email: string) {
    const res = await this.prisma.account.update({
      where: {
        email,
      },
      data: {
        verified: true,
      },
    });
  }
}
