import { Inject, Injectable } from '@nestjs/common';
import { StripeForRootOptions } from './types';
import { Stripe } from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  constructor(@Inject('options') opts: StripeForRootOptions) {
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

  async createdStripeAccountLink(
    stripeAccountId: string,
  ): Promise<{ url: string }> {
    // const data = await this.stripe.accountLinks.create({
    //   account: stripeAccountId,
    //   type: 'account_onboarding',
    //   return_url: 'https://www.goolge.com',
    //   refresh_url: 'https://www.google.com',
    // });
    const test = await this.stripe.paymentIntents.list();
    console.log(test);
    return { url: '' };
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

  async createPaymentIntent(amount: number) {
    const data = await this.stripe.paymentIntents.create({
      amount: 156,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });
    console.log(data.client_secret);
  }
}
