import { CheckoutInput } from '@dto';
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { StripeBillingService } from './stripe-billing.service';

@Resolver()
@UseGuards(new GqlAuthorizationGuard(['buyer', 'seller']))
export class StripeBillingResolver {
  constructor(private readonly stripeBillingService: StripeBillingService) {}

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
    @Args('checkoutInput') checkoutInput: CheckoutInput,
  ) {
    return this.stripeBillingService.checkout(user.id, checkoutInput);
  }

  @Mutation(() => Boolean)
  setupStripeAccount() {
    return this.stripeBillingService.setupStripeConnectedAccount();
  }
}
