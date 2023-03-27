import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { StripeForRootOptions } from './types';
import { Stripe } from 'stripe';
import { ConfigService } from '@nestjs/config';
import { STRIPE_INJECT_TOKEN } from '../constants';
import { SubscriptionMetadata } from '@stripe-billing/types';
import { AccountType } from 'nest-utils';
import { argsToArgsConfig } from 'graphql/type/definition';

@Injectable()
export class StripeService implements OnModuleInit {
  private applicationFeePercent: number;
  private webhookSecret: string;
  constructor(
    @Inject('options') opts: StripeForRootOptions,
    private readonly configService: ConfigService,
    @Inject(STRIPE_INJECT_TOKEN)
    private readonly stripe: Stripe,
  ) {
    this.applicationFeePercent = opts.application_cut_percent;
    this.webhookSecret = opts.webhookSecret;
  }

  async createConnectedAccount(
    id: string,
    type: AccountType,
    params?: Stripe.AccountCreateParams,
  ) {
    const res = await this.stripe.accounts.create({
      ...params,
      type: 'custom',
      metadata: {
        id,
        type,
      },
      capabilities: {
        card_payments: {
          requested: true,
        },
        transfers: {
          requested: true,
        },
      },
    });

    if (params && params.business_type === 'company') {
      await this.stripe.accounts.createPerson(res.id, {
        first_name: 'test',
        last_name: 'test1',
        relationship: {
          representative: true,
          owner: true,
        },
      });
    }

    return res;
  }

  async updateConnectedAccount(
    id: string,
    params?: Stripe.AccountUpdateParams,
  ) {
    const res = await this.stripe.accounts.update(id, params);

    return res;
  }

  async createConnectHostedAccount(): Promise<
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

  constructStripeEvent(body: any, headers: any): Stripe.Event {
    const signature = headers['stripe-signature'];
    try {
      const event = this.stripe.webhooks.constructEvent(
        body,
        signature,
        this.webhookSecret,
      );
      return event;
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return null;
    }
  }

  async createPaymentIntent(
    input: {
      items: {
        sellerStripeId: string;

        totalPrice: number;
      }[];
      buyerId: string;
      meta?: any;
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
      metadata: input.meta,
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

  async createMonthlyPrice(
    stripeProductId: string,
    priceInCents: number,
    currency: string = 'usd',
    name?: string,
  ): Promise<Stripe.Price> {
    const price = await this.stripe.prices.create({
      currency,
      nickname: name,
      product: stripeProductId,
      unit_amount: priceInCents,
      recurring: { interval: 'month' },
    });

    return price;
  }

  async createStripeTieredPrice(
    stripeProductId: string,
    tiers: {
      priceInCents: number;
      limit: number | 'inf';
    }[],
    recuring: 'monthly' | 'yearly' | 'daily',
    currency: string = 'usd',
    name?: string,
  ): Promise<Stripe.Price> {
    let _tiers = tiers;

    _tiers.splice(tiers.length - 1, 1, {
      limit: 'inf',
      priceInCents: tiers.at(tiers.length - 1).priceInCents,
    });

    const price = await this.stripe.prices.create({
      nickname: name,
      tiers: _tiers.map((v) => ({
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
    metadata?: SubscriptionMetadata,
  ): Promise<{ subscriptionObj: Stripe.Subscription; clientSecret: string }> {
    const subscription = await this.stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      metadata,
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

  async sendFunds({
    amount,
    connectedAccId,
    currency,
  }: {
    connectedAccId: string;
    amount: number;
    currency: string;
  }) {
    return await this.stripe.payouts.create(
      {
        amount,
        currency,
      },
      {
        stripeAccount: connectedAccId,
      },
    );
  }

  onModuleInit() {}
}
