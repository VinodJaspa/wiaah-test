import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateAccountInput, UpdateAccountInput } from './dto';
import { Account } from './entities';

import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  create(createAccountInput: CreateAccountInput) {
    try {
      const {
        confirmPassword,
        email,
        firstName,
        lastName,
        password,
        termsOfServiceAccepted,
      } = createAccountInput;
      if (password !== confirmPassword)
        throw new NotAcceptableException(
          'password and confirm password fields must match',
        );
      if (!termsOfServiceAccepted)
        throw new NotAcceptableException(
          'must accpet terms of service to create an account on wiaah',
        );
      const createdUser = this.prisma.account.create({
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
