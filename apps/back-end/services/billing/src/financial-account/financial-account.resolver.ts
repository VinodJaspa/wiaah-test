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
import { EventBus } from '@nestjs/cqrs';
import { FinancialAccountCreatedEvent } from './events/impl/financialAccountCreated.event';

@Resolver(() => FinancialAccount)
export class FinancialAccountResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly stripeService: StripeService,
    private readonly eventClient: EventBus,
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

      this.eventClient.publish(
        new FinancialAccountCreatedEvent({
          accountId: newAcc.id,
          label: newAcc.label,
          type: newAcc.type,
          cardLast4:
            newAcc.type === FinancialAccountType.card
              ? newAcc.card_number.slice(
                  newAcc.card_number.length - 4,
                  newAcc.card_number.length,
                )
              : undefined,
          userId,
          cardType: newAcc.card_type,
        }),
      );
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
          card_type:
            args.type === FinancialAccountType.card
              ? this.detectCreditCardType(args.card_number)
              : undefined,
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

  detectCreditCardType(cardNumber: string): string {
    // Remove any spaces or dashes from the card number
    const cleanedCardNumber = cardNumber.replace(/[\s-]/g, '');

    // Define an array of objects with card type and corresponding pattern
    const cardTypes = [
      { name: 'Visa', pattern: /^4[0-9]{12}(?:[0-9]{3})?$/ },
      { name: 'Mastercard', pattern: /^5[1-5][0-9]{14}$/ },
      { name: 'American Express', pattern: /^3[47][0-9]{13}$/ },
      { name: 'Discover', pattern: /^6(?:011|5[0-9]{2})[0-9]{12}$/ },
      { name: 'Diners Club', pattern: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/ },
      { name: 'JCB', pattern: /^(?:2131|1800|35\d{3})\d{11}$/ },
      { name: 'China UnionPay', pattern: /^(62[0-9]{14,17})$/ },
      {
        name: 'Maestro',
        pattern: /^(?:5[0678]\d\d|6304|6390|67\d\d)\d{8,15}$/,
      },
      { name: 'Mir', pattern: /^(?:22[89]|2[3-6]\d|27[01]|2720)\d{12}$/ },
      { name: 'Elo', pattern: /^(?:4[0356]|5[0-9]|6[0-9])\d{14}(?:\d{1,7})?$/ },
      {
        name: 'Hipercard',
        pattern: /^(?:606282\d{10}(\d{3})?)|(?:3841\d{15})$/,
      },
      { name: 'Dankort', pattern: /^(5019|4571)\d+$/ },
      { name: 'Carte Blanche', pattern: /^389[0-9]{11}$/ },
      { name: 'Laser', pattern: /^(?:6304|6706|6709|6771)[0-9]{12,15}$/ },
      {
        name: 'RuPay',
        pattern: /^(?:652[0-9]{2}|6011[0-9]{2}|64[0-9]{3})[0-9]{10}$/,
      },
    ];

    // Check the card number against each pattern
    for (const { name, pattern } of cardTypes) {
      if (pattern.test(cleanedCardNumber)) {
        return name;
      }
    }

    // If no match is found, return "Unknown"
    return 'Unknown';
  }
}
