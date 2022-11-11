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

  async createStripeProduct(
    productName: string,
    description?: string,
  ): Promise<Stripe.Product> {
    const product = await this.stripe.products.create({
      name: productName,
      shippable: false,
      description,
    });
    return product;
  }

  async updateStripeProduct(
    name: string,
    description?: string,
  ): Promise<Stripe.Product> {
    const product = await this.stripe.products.create({
      name: name,
      shippable: false,
      description,
    });
    return product;
  }

  async createStripeTieredPrice(
    stripeProductId: string,
    tiers: {
      priceInCents: number;
      limit: number;
    }[],
    recuring: 'monthly' | 'yearly' | 'daily',
    currency: string = 'usd',
    name?: string,
  ): Promise<Stripe.Price> {
    const price = await this.stripe.prices.create({
      nickname: name,
      tiers: tiers.map((v) => ({
        up_to: v.limit,
        unit_amount: v.priceInCents,
      })),
      currency,
      recurring: {
        interval:
          recuring === 'monthly'
            ? 'month'
            : recuring === 'daily'
            ? 'day'
            : recuring === 'yearly'
            ? 'year'
            : undefined,
        usage_type: 'metered',
      },
      product: stripeProductId,
      tiers_mode: 'graduated',
      billing_scheme: 'tiered',
      expand: ['tiers'],
    });

    return price;
  }

  async updateSubscriptionItemUsage(
    itemId: string,
    usage: number,
  ): Promise<Stripe.UsageRecord> {
    const usageRecord = await this.stripe.subscriptionItems.createUsageRecord(
      itemId,
      { quantity: usage, timestamp: 'now' },
    );
    return usageRecord;
  }

  async createCustomerSubscription(
    customerId: string,
    priceId: string,
  ): Promise<{ subscriptionObj: Stripe.Subscription; clientSecret: string }> {
    const subscription = await this.stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });

    const clientSecret =
      subscription.latest_invoice?.['payment_intent']?.['client_secret'];

    return { clientSecret, subscriptionObj: subscription };
  }

  async updateCustomerSubscriptionPrice(
    subscriptionId: string,
    priceId: string,
  ): Promise<Stripe.Subscription> {
    const subscription = await this.stripe.subscriptions.update(
      subscriptionId,
      {
        items: [{ price: priceId }],
      },
    );
    return subscription;
  }

  async createCustomer(name: string, email: string): Promise<Stripe.Customer> {
    const customer = await this.stripe.customers.create({
      name,
      email,
    });

    return customer;
  }

  async updateCustomer(
    customerId: string,
    name?: string,
    email?: string,
  ): Promise<Stripe.Customer> {
    const customer = await this.stripe.customers.update(customerId, {
      name,
      email,
    });

    return customer;
  }
}
