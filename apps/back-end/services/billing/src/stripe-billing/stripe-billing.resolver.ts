import { CheckoutInput } from '@dto';
import { Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ClientKafka } from '@nestjs/microservices';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  KAFKA_MESSAGES,
  KAFKA_SERVICE_TOKEN,
} from 'nest-utils';
import { StripeBillingService } from './stripe-billing.service';

@Resolver()
@UseGuards(new GqlAuthorizationGuard(['buyer', 'seller']))
export class StripeBillingResolver implements OnModuleInit {
  constructor(
    private readonly stripeBillingService: StripeBillingService,
    @Inject(KAFKA_SERVICE_TOKEN) private readonly eventsCLient: ClientKafka,
  ) {}

  @Mutation(() => Boolean)
  async createConnectedAccount() {
    try {
      await this.stripeBillingService.createdStripeConnectedAccount();

      return true;
    } catch {
      return false;
    }
  }
  @Mutation(() => Boolean)
  async getConnectedAccounts() {
    try {
      await this.stripeBillingService.getStripeConnectedAccounts();

      return true;
    } catch {
      return false;
    }
  }

  @Mutation(() => Boolean)
  checkout(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('checkoutInput', { nullable: true }) checkoutInput: CheckoutInput,
  ) {
    return this.stripeBillingService.checkout(user.id, checkoutInput);
  }

  @Mutation(() => Boolean)
  setupStripeAccount() {
    return this.stripeBillingService.setupStripeConnectedAccount();
  }

  async onModuleInit() {
    await this.eventsCLient.subscribeToResponseOf(
      KAFKA_MESSAGES.SHOPPING_CART_MESSAGES.getShoppingCartItems,
    );
    await this.eventsCLient.connect();
  }
}
