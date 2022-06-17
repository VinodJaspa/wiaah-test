import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { CreateAccountInput, UpdateAccountInput } from './dto';
import { Account } from './entities';

import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async createAccountRecord(createAccountInput: CreateAccountInput) {
    try {
      const { email, firstName, lastName, password } = createAccountInput;

      const createdUser = await this.prisma.account.create({
        data: {
          email,
          firstName,
          lastName,
          password,
        },
      });

      return createdUser;
    } catch (error) {
      console.log('account creation error' + error);
      return null;
    }
  }

  async emailExists(email: string): Promise<boolean> {
    try {
      if (typeof email !== 'string')
        throw new BadRequestException('invalid email field');

      const account = await this.prisma.account.findFirst({
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
          throw new NotAcceptableException(
            'account with this email was not found',
          );
        },
      });

      return account;
    } catch (error) {}
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
    updateAccountInput: UpdateAccountInput,
  ): Promise<Partial<Account>> {
    try {
      const { id, ...rest } = updateAccountInput;
      const res = await this.prisma.account.update({
        where: {
          id,
        },
        data: rest,
      });
      return res;
    } catch (err) {
      throw new BadRequestException('account was not found');
    }
  }

  remove(id: string) {
    return this.prisma.account.delete({
      where: {
        id,
      },
    });
  }
}
