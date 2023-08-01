import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ExtractPagination, KAFKA_EVENTS, SERVICES } from 'nest-utils';
import { ClientKafka } from '@nestjs/microservices';
import { NewAccountCreatedEvent } from 'nest-dto';
import { AccountType, Prisma } from '@prisma-client';
import { PrismaService } from 'prismaService';

import * as bcrypt from 'bcrypt';
import { Account } from './entities';
import { UpdateAccountInput } from './dto/update-account.input';
import { GetFilteredSellersAccountsInput } from './dto/get-sellers-accounts.input';

@Injectable()
export class AccountsService {
  constructor(
    private prisma: PrismaService,
    @Inject(SERVICES.ACCOUNTS_SERVICE.token)
    private readonly eventsClient: ClientKafka,
  ) {}

  async createAccountRecord(createAccountInput: Prisma.AccountCreateInput) {
    try {
      const { email, firstName, lastName, password, accountType, birthDate } =
        createAccountInput;

      const createdUser = await this.prisma.account.create({
        data: {
          email,
          firstName,
          lastName,
          password,
          accountType,
          birthDate,
          ...createAccountInput,
        },
      });
      this.eventsClient.emit<string, NewAccountCreatedEvent>(
        KAFKA_EVENTS.ACCOUNTS_EVENTS.accountCreated,
        new NewAccountCreatedEvent({
          email: createdUser.email,
          id: createdUser.id,
          accountType: createdUser.accountType,
          firstName: createdUser.firstName,
          lastName: createdUser.lastName,
          username: createdUser.firstName,
          birthDate,
        }),
      );
      return createdUser;
    } catch (error) {
      return null;
    }
  }
  hashPassword(password: string) {
    return bcrypt.hash(password, 12);
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
      console.log('get by email');
      if (typeof email !== 'string')
        throw new BadRequestException('invalid email type');

      console.log('getting all by email');
      const res = [];
      console.log('got all', { res });

      const account = await this.prisma.account.findUnique({
        where: {
          email,
        },
        rejectOnNotFound(error) {
          throw new NotFoundException(
            'could not find an account with this email, consider registering a new account',
          );
        },
      });

      return account;
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll(args: GetFilteredSellersAccountsInput, type: AccountType) {
    const { page, skip, take } = ExtractPagination(args.pagination);
    const filters: Prisma.AccountWhereInput[] = [];

    if (args.sales)
      filters.push({
        sales: {
          gte: args.sales,
        },
      });

    if (args.name)
      filters.push({
        OR: [
          {
            firstName: {
              contains: args.name,
            },
          },
          {
            lastName: {
              contains: args.name,
            },
          },
        ],
      });

    if (args.email)
      filters.push({
        email: {
          contains: args.email,
        },
      });

    if (args.date && !isNaN(Date.parse(new Date(args.date).toString())))
      filters.push({
        createdAt: {
          gte: new Date(args.date),
        },
      });

    if (args.products)
      filters.push({
        products: {
          gte: args.products,
        },
      });

    if (args.status)
      filters.push({
        status: args.status,
      });

    if (type) {
      filters.push({
        accountType: type,
      });
    }

    return this.prisma.account.findMany({
      where: {
        AND: filters,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take,
      skip,
    });
  }

  async findOne(id: string): Promise<Account> {
    const account = await this.prisma.account.findUnique({
      where: {
        id,
      },
    });

    return account;
  }

  async updateProtected(input: UpdateAccountInput, userId: string) {
    return this.update(input, userId);
  }

  async update(
    input: UpdateAccountInput,
    userId: string,
  ): Promise<Partial<Account>> {
    try {
      const { password, ...res } = await this.prisma.account.update({
        where: {
          id: userId,
        },
        data: input,
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

    return account.accountType === 'seller';
  }

  async switchToSeller(userId: string) {
    try {
      await this.prisma.account.update({
        data: {
          accountType: 'seller',
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

  async deleteAccount(id: string) {
    return this.prisma.account.delete({
      where: {
        id,
      },
    });
  }
}
