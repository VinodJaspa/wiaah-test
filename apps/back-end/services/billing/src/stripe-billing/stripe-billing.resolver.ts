import {
  BadRequestException,
  Inject,
  InternalServerErrorException,
  OnModuleInit,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { ClientKafka } from '@nestjs/microservices';
import {
  accountType,
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  KafkaMessageHandler,
  KAFKA_MESSAGES,
  SERVICES,
} from 'nest-utils';
import { StripeService } from '@stripe';

import { CreateMembershipPaymentIntentCommand } from './commands';
import { CreateMembershipPaymentIntentInput, WithdrawInput } from './dto';
import { PaymentIntent } from './entities';
import { StripeBillingService } from './stripe-billing.service';
import {
  GetCurrencyExchangeRateMessage,
  GetCurrencyExchangeRateMessageReply,
  GetUserBalanceMessage,
  GetUserBalanceMessageReply,
} from 'nest-dto';
import { PrismaService } from 'prismaService';
import { FinancialAccountType } from '@prisma-client';
import { CreateBillingAccountInput } from './dto/update-billing-account.input';
import { Upload, GraphQLUpload } from 'graphql-upload';
import { BillingAccountBusinessType } from './entities/billing-account.entity';

@Resolver()
export class StripeBillingResolver implements OnModuleInit {
  constructor(
    private readonly stripeBillingService: StripeBillingService,
    @Inject(SERVICES.BILLING_SERVICE.token)
    private readonly eventsCLient: ClientKafka,
    private readonly commandBus: CommandBus,
    private readonly stripeService: StripeService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => String)
  @UseGuards(new GqlAuthorizationGuard([]))
  async getMyBillingAccount(@GqlCurrentUser() user: AuthorizationDecodedUser) {
    const acc = await this.prisma.financialAccount.findUnique({
      where: {
        ownerId_type: {
          ownerId: user.id,
          type: FinancialAccountType.stripe,
        },
      },
    });

    if (acc) {
      const stripeAcc = await this.stripeService.getConnectedAccountById(
        acc.financialId,
      );
      console.log(stripeAcc.payouts_enabled, stripeAcc.requirements);
      console.log(JSON.stringify(stripeAcc, null, 2));
      return JSON.stringify(stripeAcc);
    } else {
      const stripeAcc = await this.stripeService.createConnectedAccount(
        user.id,
        user.accountType,
      );

      await this.prisma.financialAccount.create({
        data: {
          financialId: stripeAcc.id,
          label: 'Stripe',
          ownerId: user.id,
          type: FinancialAccountType.stripe,
        },
      });

      return JSON.stringify(stripeAcc);
    }
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([]))
  async updateByBillingAccount(
    @Args('args') args: CreateBillingAccountInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Context() ctx: { ip: string },
  ) {
    try {
      console.log(ctx.ip);
      const finAcc = await this.prisma.financialAccount.findUnique({
        where: {
          ownerId_type: {
            ownerId: user.id,
            type: 'stripe',
          },
        },
      });

      if (finAcc) {
        const res = await this.stripeService.updateConnectedAccount(
          finAcc.financialId,
          {
            ...args,
            company:
              args.business_type === BillingAccountBusinessType.company
                ? args.company
                : undefined,
            individual:
              args.business_type === BillingAccountBusinessType.individual
                ? args.individual
                : undefined,
            external_account: undefined,
            tos_acceptance: {
              date: Math.floor(Date.now() / 1000),
              ip: ctx.ip,
            },
          },
        );
      } else {
        const res = await this.stripeService.createConnectedAccount(
          user.id,
          user.accountType,
          {
            ...args,
            company:
              args.business_type === BillingAccountBusinessType.company
                ? args.company
                : undefined,
            individual:
              args.business_type === BillingAccountBusinessType.individual
                ? args.individual
                : undefined,
            tos_acceptance: {
              date: Math.floor(Date.now() / 1000),
              ip: ctx.ip,
            },
          },
        );

        await this.prisma.financialAccount.create({
          data: {
            financialId: res.id,
            label: 'Stripe',
            ownerId: user.id,
            type: 'stripe',
          },
        });
        console.log(JSON.stringify(res, null, 2));
      }

      return true;
    } catch (err) {
      console.log('err', err);
      return false;
    }
  }

  @Mutation(() => String)
  @UseGuards(new GqlAuthorizationGuard([]))
  async uploadStripeBankDocument(
    @Args('doc', { type: () => GraphQLUpload }) doc: Upload,
    @Args('test') test: string,
  ) {
    console.log('uploaded', doc);
  }

  @Mutation(() => String)
  @UseGuards(new GqlAuthorizationGuard([accountType.SELLER]))
  async createConnectedAccount(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    try {
      return await this.stripeBillingService.createStripeConnectedAccount(user);
    } catch (err) {
      throw err;
    }
  }

  @Mutation(() => PaymentIntent)
  @UseGuards(new GqlAuthorizationGuard([]))
  async createCartPaymentIntent(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<string> {
    try {
      return await this.stripeBillingService.checkout(user);
    } catch (error) {
      console.log({ error });
      throw error;
    }
  }

  @Mutation(() => PaymentIntent)
  @UseGuards(new GqlAuthorizationGuard([accountType.SELLER, accountType.BUYER]))
  async createMembershipSubscriptionPaymentIntent(
    @Args('args') args: CreateMembershipPaymentIntentInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    const res = await this.commandBus.execute<
      CreateMembershipPaymentIntentCommand,
      { client_secert: string }
    >(new CreateMembershipPaymentIntentCommand(args, user));

    return res;
  }

  @Mutation(() => Boolean)
  async withdraw(
    @Args('args') args: WithdrawInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    const res = await KafkaMessageHandler<
      string,
      GetUserBalanceMessage,
      GetUserBalanceMessageReply
    >(
      this.eventsCLient,
      KAFKA_MESSAGES.BILLING_MESSAGES.getUserBalance,
      new GetUserBalanceMessage({ userId: user.id }),
    );

    if (typeof res.input.withdrawable !== 'number')
      throw new InternalServerErrorException('failed to get balance');

    if (res.input.withdrawable < args.amount)
      throw new BadRequestException('Not enough balance');

    const finAccount = await this.prisma.financialAccount.findUnique({
      where: {
        id: args.methodId,
      },
    });

    if (!finAccount)
      throw new BadRequestException('This financial account was not found');

    switch (finAccount.type) {
      case FinancialAccountType.stripe:
        const curr = await KafkaMessageHandler<
          string,
          GetCurrencyExchangeRateMessage,
          GetCurrencyExchangeRateMessageReply
        >(
          this.eventsCLient,
          KAFKA_MESSAGES.CURRENCY_MESSAGES.getCurrencyExchangeRate,
          new GetCurrencyExchangeRateMessage({
            targetCurrencyCode: args.currency,
          }),
        );

        const amount = args.amount * curr.results.data.rate;

        const res = await this.stripeService.sendFunds({
          amount,
          connectedAccId: finAccount.financialId,
          currency: curr.results.data.convertedToCurrency,
        });
        return true;
        break;

      default:
        return false;
    }
  }

  @Query(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async getConnectedAccounts() {
    try {
      await this.stripeBillingService.getStripeConnectedAccounts();
      return true;
    } catch (err) {
      return false;
    }
  }

  async onModuleInit() {
    this.eventsCLient.subscribeToResponseOf(
      KAFKA_MESSAGES.SHOPPING_CART_MESSAGES.getShoppingCartItems,
    );
    this.eventsCLient.subscribeToResponseOf(
      KAFKA_MESSAGES.ACCOUNTS_MESSAGES.hasStripeId,
    );
    this.eventsCLient.subscribeToResponseOf(
      KAFKA_MESSAGES.BILLING_MESSAGES.getUserMembershipPriceId,
    );
    await this.eventsCLient.connect();
  }
}
