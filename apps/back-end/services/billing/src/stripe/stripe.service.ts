import { Inject, Injectable } from '@nestjs/common';
import { StripeForRootOptions } from './types';
import { Stripe } from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  constructor(
    @Inject('options') opts: StripeForRootOptions,
    private readonly configService: ConfigService,
  ) {
    this.stripe = new Stripe(opts.apiKey, {
      apiVersion: '2020-08-27',
      typescript: true,
    });
  }

  async createdConnectedAccount(): Promise<Stripe.Account> {
    const data = await this.stripe.accounts.create({
      type: 'express',
    });

    return data;
  }

  createdStripeAccountLink(
    stripeAccountId: string,
  ): Promise<Stripe.AccountLink> {
    const data = this.stripe.accountLinks.create({
      account: stripeAccountId,
      type: 'account_onboarding',
      return_url: this.configService.get('stripe_return_url'),
      refresh_url: this.configService.get('stripe_refresh_url'),
    });
    return data;
  }

  async getConnectedAccounts(): Promise<Stripe.Account[]> {
    const { data } = await this.stripe.accounts.list();
    return data;
  }

  async getConnectedAccountById(
    stripeConnectedId: string,
  ): Promise<Stripe.Account> {
    const data = await this.stripe.accounts.retrieve(stripeConnectedId);
    return data;
  }

  async createPaymentIntent(
    amount: number,
    currency: string = 'usd',
  ): Promise<Stripe.PaymentIntent> {
    const data = await this.stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    return data;
  }
}
