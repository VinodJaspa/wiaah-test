import { Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { ClientKafka } from '@nestjs/microservices';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  KAFKA_MESSAGES,
  SERVICES,
} from 'nest-utils';

import { StripeBillingService } from './stripe-billing.service';

@Resolver()
@UseGuards(new GqlAuthorizationGuard(['seller']))
export class StripeBillingResolver implements OnModuleInit {
  constructor(
    private readonly stripeBillingService: StripeBillingService,
    @Inject(SERVICES.BILLING_SERVICE.token)
    private readonly eventsCLient: ClientKafka,
  ) {}

  @Mutation(() => String)
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
  async createPaymentIntent(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<string> {
    return await this.stripeBillingService.checkout(user);
  }

  @Query(() => Boolean)
  async getConnectedAccounts() {
    try {
      const res = await this.stripeBillingService.getStripeConnectedAccounts();

      console.log(res);
      return true;
    } catch (err) {
      console.log(err);
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
