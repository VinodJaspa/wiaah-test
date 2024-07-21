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
import { StripeService } from 'nest-utils';
import { CreateMembershipPaymentIntentCommand } from './commands';
import { CreateMembershipPaymentIntentInput, WithdrawInput } from './dto';
import { PaymentIntent } from './entities';
import { StripeBillingService } from './stripe-billing.service';
import { GetUserBalanceMessage, GetUserBalanceMessageReply } from 'nest-dto';
import { PrismaService } from 'prismaService';
import { CreateBillingAccountInput } from './dto/update-billing-account.input';
import { Upload, GraphQLUpload } from 'graphql-upload-ts';
import {
  BillingAccount,
  BillingAccountBusinessType,
} from './entities/billing-account.entity';

@Resolver()
export class StripeBillingResolver implements OnModuleInit {
  constructor(
    private readonly stripeBillingService: StripeBillingService,
    @Inject(SERVICES.BILLING_SERVICE.token)
    private readonly eventsCLient: ClientKafka,
    private readonly commandBus: CommandBus,
    private readonly stripeService: StripeService,
    private readonly prisma: PrismaService,
  ) { }

  @Query(() => BillingAccount)
  @UseGuards(new GqlAuthorizationGuard([]))
  async getUserPayoutAccount(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('stripeId', { nullable: true }) stripId?: string,
  ): Promise<BillingAccount> {
    const stripeId =
      user.accountType === accountType.ADMIN ? stripId : user.stripeId;
    const res = await this.stripeService.getConnectedAccountById(stripeId);

    return res;
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([]))
  async updatePayoutAccount(
    @Args('args') _args: CreateBillingAccountInput,
    @Args('userId') id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Context() ctx: { ip: string },
    @Args('stripeId', { nullable: true }) stripId?: string,
  ) {
    await this.validateRequest(user, id);
    try {
      const { companyMembers, ...args } = _args;
      const stripeId =
        user.accountType === accountType.ADMIN ? stripId : user.stripeId;

      if (stripId) {
        await Promise.all(
          companyMembers.map(async (v) => {
            if (v.id) {
              const { id, ...rest } = v;
              await this.stripeService.updateCompanyPerson(stripeId, id, rest);
            } else {
              await this.stripeService.createPerson(stripeId, v);
            }
          }),
        );

        const members = await this.stripeService.getCompanyMembers(stripeId);

        const res = await this.stripeService.updateConnectedAccount(stripeId, {
          ...args,
          company:
            args.business_type === BillingAccountBusinessType.company
              ? {
                ...args.company,
                owners_provided: members.data
                  .map((v) => v?.relationship?.owner)
                  .some((v) => !!v),
              }
              : undefined,
          individual:
            args.business_type === BillingAccountBusinessType.individual
              ? args.individual
              : undefined,
          tos_acceptance: {
            date: Math.floor(Date.now() / 1000),
            ip: ctx.ip,
          },
        });
        if (companyMembers) {
          const members = await Promise.all(
            companyMembers.map((v) =>
              this.stripeService.createPerson(res.id, {
                relationship: {},
              }),
            ),
          );
        }
      } else {
        const res = await this.stripeService.createConnectedAccount({
          ...args,
          company:
            args.business_type === BillingAccountBusinessType.company
              ? {
                ...args.company,
                owners_provided: companyMembers.some(
                  (v) => !!v?.relationship?.owner,
                ),
              }
              : undefined,
          individual:
            args.business_type === BillingAccountBusinessType.individual
              ? args.individual
              : undefined,
          tos_acceptance: {
            date: Math.floor(Date.now() / 1000),
            ip: ctx.ip,
          },
        });

        if (companyMembers) {
          const members = await Promise.all(
            companyMembers.map(({ id, ...v }) =>
              this.stripeService.createPerson(res.id, v),
            ),
          );
        }
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
  // @UseGuards(new GqlAuthorizationGuard([accountType.SELLER, accountType.BUYER]))
  async createMembershipSubscriptionPaymentIntent(
    @Args('args') args: CreateMembershipPaymentIntentInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    console.log({ user });
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

    await this.stripeService.sendFunds({
      amount: args.amount,
      connectedAccId: user.stripeId,
      currency: finAccount.currency,
      externalAccountId: finAccount.financialId,
    });
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

  async validateRequest(user: AuthorizationDecodedUser, id: string) {
    return user.id === id || user.accountType === accountType.ADMIN;
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
