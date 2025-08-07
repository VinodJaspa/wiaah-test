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
import { UploadService } from '@wiaah/upload';
import { UpdateDataSharingInput } from './dto/update-data-sharing.input';

@Injectable()
export class AccountsService {
  constructor(
    private prisma: PrismaService,
    @Inject(SERVICES.ACCOUNTS_SERVICE.token)
    private readonly eventsClient: ClientKafka,
    private readonly uploadService: UploadService,
  ) { }

  async createAccountRecord(createAccountInput: Prisma.AccountCreateInput) {
    try {
      const { email, firstName, lastName, password, accountType, birthDate } =
        createAccountInput;

      // Hash the password if not already done
      const hashedPassword = await this.hashPassword(password);
      const createdUser = await this.prisma.account.create({
        data: {
          email,
          firstName,
          lastName,
          password: hashedPassword,
          accountType,
          birthDate,
          ...createAccountInput,
        },
      });

      //Emit Kafka event
      this.eventsClient.emit<string, NewAccountCreatedEvent>(
        KAFKA_EVENTS.ACCOUNTS_EVENTS.accountCreated,
        new NewAccountCreatedEvent({
          email: createdUser.email,
          id: createdUser.id,
          accountType: createdUser.accountType,
          firstName: createdUser.firstName,
          lastName: createdUser.lastName,
          username: createdUser.firstName, // Use a dedicated field for username if possible
          birthDate: birthDate,
        }),
      );

      return createdUser;
    } catch (error) {
      // Log the error for better visibility
      console.error('Error creating account:', error);
      // Optionally, throw a custom exception
      throw new Error('Account creation failed');
    }
  }
  async hashPassword(password: string) {
    return await bcrypt.hash(password, 12);
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
      });
      console.log('Account ' + JSON.stringify(account));

      return account;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(id: string) {
    try {
      if (typeof id !== 'string')
        throw new BadRequestException('invalid id type');

      const account = await this.prisma.account.findUnique({
        where: {
          id: id,
        },
      });
      console.log('Account ' + JSON.stringify(account));

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
          has: args.products[0],
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



  async update(input: UpdateAccountInput, userId: string): Promise<Partial<Account>> {
    try {
      // 2. Build the Prisma update object excluding `photo` field if not needed
      const { photo, id, ...rest } = input;

      const updateData = {
        ...rest,
      };

      // 3. Call Prisma updatez
      const { password, ...res } = await this.prisma.account.update({
        where: { id: userId },
        data: updateData,
      });

      return res;

    } catch (err) {
      console.error(err);
      throw new BadRequestException('account was not found or update failed');
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

  async updateDataSharing(accountId: string, input: UpdateDataSharingInput): Promise<Account> {
    return this.prisma.account.update({
      where: { id: accountId },
      data: {
        shareAdPartners: input.shareAdPartners,
        shareAnalyticsTools: input.shareAnalyticsTools,
        shareSocialNetworks: input.shareSocialNetworks,
        sharePaymentProcessors: input.sharePaymentProcessors,
      },
    });
  }
  async suspendAccount(accountId: string, reason?: string) {
    return await this.prisma.account.update({
      where: { id: accountId },
      data: {
        suspended: true,

      },
    });
  }
  async updateSuspensionStatus(
    accountId: string,
    suspended: boolean,
    reason?: string,
  ) {
    const account = await this.prisma.account.findUnique({
      where: {
        id: accountId,
      },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    account.suspended = suspended;
    if (reason) account.rejectReason = reason;
    await this.prisma.account.update({
      where: { id: accountId },
      data: {
        suspended: account.suspended,
        rejectReason: account.rejectReason,
      },
    });
    console.log(`✅ Account ${accountId} suspension updated`);
  }
}
