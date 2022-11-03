import { Inject, Injectable } from '@nestjs/common';
import { StripeForRootOptions } from './types';
import { Stripe } from 'stripe';
import { ConfigService } from '@nestjs/config';
import { STRIPE_INJECT_TOKEN } from '../constants';

@Injectable()
export class StripeService {
  private applicationFeePercent: number;
  constructor(
    @Inject('options') opts: StripeForRootOptions,
    private readonly configService: ConfigService,
    @Inject(STRIPE_INJECT_TOKEN)
    private readonly stripe: Stripe,
  ) {
    this.applicationFeePercent = opts.application_cut_percent;
  }

  async createdConnectedAccount(): Promise<
    [Stripe.AccountLink, Stripe.Account]
  > {
    const res = await this.stripe.accounts.create({
      type: 'express',
    });

    const data = await this.stripe.accountLinks.create({
      account: res.id,
      type: 'account_onboarding',
      return_url: this.configService.get('stripe_return_url'),
      refresh_url: this.configService.get('stripe_refresh_url'),
    });

    return [data, res];
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
    input: {
      items: {
        sellerStripeId: string;
        totalPrice: number;
      }[];
      buyerId: string;
    },
    currency: string = 'usd',
  ): Promise<Stripe.PaymentIntent> {
    const totalAmount = input.items.reduce(
      (acc, curr) => acc + curr.totalPrice,
      0,
    );
    console.log({ totalAmount, input: JSON.stringify(input, null, 2) });
    const data = await this.stripe.paymentIntents.create({
      amount: totalAmount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      transfer_group: input.buyerId,
    });

    for (const item of input.items) {
      const sellerAmount = Math.abs(
        this.applicationFeePercent * item.totalPrice - item.totalPrice,
      );

      await this.stripe.transfers.create({
        destination: item.sellerStripeId,
        currency,
        amount: sellerAmount,
        transfer_group: input.buyerId,
      });
    }

    return data;
  }
}
