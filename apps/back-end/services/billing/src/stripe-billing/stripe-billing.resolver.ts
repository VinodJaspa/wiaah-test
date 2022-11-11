import { Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ClientKafka } from '@nestjs/microservices';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  KAFKA_MESSAGES,
  SERVICES,
} from 'nest-utils';

import { CreateMembershipPaymentIntentCommand } from './commands';
import { CreateMembershipPaymentIntentInput } from './dto';
import { StripeBillingService } from './stripe-billing.service';

@Resolver()
export class StripeBillingResolver implements OnModuleInit {
  constructor(
    private readonly stripeBillingService: StripeBillingService,
    @Inject(SERVICES.BILLING_SERVICE.token)
    private readonly eventsCLient: ClientKafka,
    private readonly commandBus: CommandBus,
  ) {}

  @Mutation(() => String)
  @UseGuards(new GqlAuthorizationGuard(['seller']))
  async createConnectedAccount(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    try {
      return await this.stripeBillingService.createStripeConnectedAccount(user);
    } catch (err) {
      throw err;
    }
  }

  @Mutation(() => String)
  @UseGuards(new GqlAuthorizationGuard([]))
  async createCartPaymentIntent(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<string> {
    return await this.stripeBillingService.checkout(user);
  }

  @Mutation(() => String)
  @UseGuards(new GqlAuthorizationGuard(['seller']))
  async createMembershipSubscriptionPaymentIntent(
    @Args('args') args: CreateMembershipPaymentIntentInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    await this.commandBus.execute<
      CreateMembershipPaymentIntentCommand,
      { client_secert: string }
    >(new CreateMembershipPaymentIntentCommand(args, user));
  }

  @Query(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard(['admin']))
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
    await this.eventsCLient.connect();
  }
}
