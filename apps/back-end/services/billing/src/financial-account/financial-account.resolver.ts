import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { FinancialAccountType } from '@prisma-client';
import { StripeService } from 'nest-utils';
import {
  accountType,
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { PrismaService } from 'prismaService';
import { AdminGetUserFinancialAccounts } from './dto/admn-get-user-financial-accounts';
import { CreateFinancialAccountInput } from './dto/create-financial-account.input';
import { UpdateFinancialAccountInput } from './dto/update-financial-account.input';
import { FinancialAccount } from './entities/financial-account.entity';

@Resolver(() => FinancialAccount)
export class FinancialAccountResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly stripeService: StripeService,
  ) {}

  @Query(() => [FinancialAccount])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  adminGetUserFinancialAccounts(
    @Args('args') args: AdminGetUserFinancialAccounts,
  ) {
    return this.prisma.financialAccount.findMany({
      where: { ownerId: args.accountId },
    });
  }

  @Query(() => [FinancialAccount])
  @UseGuards(new GqlAuthorizationGuard([accountType.SELLER, accountType.BUYER]))
  getMyFinancialAccounts(@GqlCurrentUser() user: AuthorizationDecodedUser) {
    return this.prisma.financialAccount.findMany({
      where: {
        ownerId: user.id,
      },
    });
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([]))
  async createFinancialAccount(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('args') args: CreateFinancialAccountInput,
    @Args('userId') userId: string,
  ): Promise<boolean> {
    if (!user?.stripeId) return false;
    try {
      const res = await this.stripeService.createExternalAccount(
        user.stripeId,
        args.type === FinancialAccountType.bank
          ? {
              bank: {
                account_number: args.bank_number,
                country: args.bank_country,
                currency: args.currency,
              },
              card: undefined,
            }
          : {
              card: {
                exp_month: args.card_exp_month,
                exp_year: args.card_exp_year,
                number: args.card_number,
                cvc: args.card_cvc,
                currency: args.currency,
              },
              bank: undefined,
            },
      );

      const newAcc = await this.prisma.financialAccount.create({
        data: {
          ...args,
          ownerId: userId,
          financialId: user.stripeId,
        },
      });

      return true;
    } catch (error) {
      console.log('financial acc create error', error);
      return false;
    }
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([]))
  async deleteFinancialAccount(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('accountId') id: string,
    @Args('userId') userId: string,
  ): Promise<boolean> {
    await this.validateUser(user, userId);
    try {
      await this.prisma.financialAccount.delete({
        where: {
          id,
        },
      });

      return true;
    } catch (error) {
      console.log('financial acc delete error', error);
      return false;
    }
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([]))
  async updateFinancialAccount(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('args') args: UpdateFinancialAccountInput,
    @Args('userId') userId: string,
  ): Promise<boolean> {
    if (!user?.stripeId) return false;
    try {
      const finAcc = await this.prisma.financialAccount.findUnique({
        where: {
          id: args.id,
        },
      });

      if (!finAcc) return false;

      await this.stripeService.updateExternalAccount(
        user.stripeId,
        finAcc.financialId,
        args.type === FinancialAccountType.bank
          ? {
              bank: {
                account_number: args.bank_number,
                country: args.bank_country,
                currency: args.currency,
              },
              card: undefined,
            }
          : {
              card: {
                exp_month: args.card_exp_month,
                exp_year: args.card_exp_year,
                number: args.card_number,
                cvc: args.card_cvc,
                currency: args.currency,
              },
              bank: undefined,
            },
      );

      await this.prisma.financialAccount.update({
        where: {
          id: args.id,
        },
        data: {
          ...args,
          ownerId: userId,
          financialId: user.stripeId,
        },
      });

      return true;
    } catch (error) {
      console.log('financial acc update error', error);
      return false;
    }
  }

  @ResolveField(() => String, { nullable: true })
  async cardLast4(@Parent() account: FinancialAccount) {
    const acc = await this.prisma.financialAccount.findUnique({
      where: {
        id: account.id,
      },
    });
    return account.type === FinancialAccountType.card
      ? acc.card_number.slice(
          acc.card_number.length - 4,
          acc.card_number.length,
        )
      : undefined;
  }

  async validateUser(user: AuthorizationDecodedUser, id: string) {
    return user.id === id || user.accountType === accountType.ADMIN;
  }
}
