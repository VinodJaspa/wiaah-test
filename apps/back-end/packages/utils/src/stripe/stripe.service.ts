import {
  Inject,
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from "@nestjs/common";
import { StripeForRootOptions } from "./types";
import { Stripe } from "stripe";
import { ConfigService } from "@nestjs/config";
import { STRIPE_INJECT_TOKEN } from "./constent";

@Injectable()
export class StripeService implements OnModuleInit {
  private applicationFeePercent: number;
  private webhookSecret: string;
  constructor(
    @Inject("options") opts: StripeForRootOptions,
    private readonly configService: ConfigService,
    @Inject(STRIPE_INJECT_TOKEN)
    private readonly stripe: Stripe
  ) {
    this.applicationFeePercent = opts.application_cut_percent;
    this.webhookSecret = opts.webhookSecret;
  }

  async createConnectedAccount(params?: Stripe.AccountCreateParams) {
    const res = await this.stripe.accounts.create({
      ...params,
      type: "custom",
      metadata: {},
      capabilities: {
        card_payments: {
          requested: true,
        },
        transfers: {
          requested: true,
        },
      },
    });

    return res;
  }

  async createCustomerAccount() {
    return this.stripe.customers.create({ metadata: {} });
  }

  async createPerson(
    stripeAccountId: string,
    params: Stripe.PersonCreateParams
  ) {
    const res = await this.stripe.accounts.createPerson(
      stripeAccountId,
      params
    );
    return res;
  }

  async getCompanyMembers(stripeAccountId: string) {
    const res = await this.stripe.accounts.listPersons(stripeAccountId);

    return res;
  }

  async updateCompanyPerson(
    stripeAccountId: string,
    id: string,
    params?: Stripe.PersonUpdateParams
  ) {
    const res = await this.stripe.accounts.updatePerson(
      stripeAccountId,
      id,
      params
    );
    return res;
  }

  async createExternalAccount(
    stripeId: string,
    data:
      | { card: Stripe.TokenCreateParams.Card; bank: undefined }
      | { card: undefined; bank: Stripe.TokenCreateParams.BankAccount }
  ) {
    const token = await this.stripe.tokens.create({
      card: data.card,
      bank_account: data.bank,
    });

    const res = await this.stripe.accounts.createExternalAccount(stripeId, {
      external_account: token.id,
    });

    return res;
  }
  async updateExternalAccount(
    stripeId: string,
    external_accountId: string,
    data:
      | { card: Stripe.TokenCreateParams.Card; bank: undefined }
      | { card: undefined; bank: Stripe.TokenCreateParams.BankAccount }
  ) {
    const token = await this.stripe.tokens.create({
      card: data.card,
      bank_account: data.bank,
    });

    const res = await this.stripe.accounts.updateExternalAccount(
      stripeId,
      external_accountId,
      {
        //@ts-ignore
        external_account: token.id,
      }
    );

    return res;
  }

  async updateConnectedAccount(
    id: string,
    params?: Stripe.AccountUpdateParams
  ) {
    const res = await this.stripe.accounts.update(id, params);

    return res;
  }

  async createConnectHostedAccount(): Promise<
    [Stripe.AccountLink, Stripe.Account]
  > {
    const res = await this.stripe.accounts.create({
      type: "express",
    });

    const data = await this.stripe.accountLinks.create({
      account: res.id,
      type: "account_onboarding",
      return_url: this.configService.get("stripe_return_url"),
      refresh_url: this.configService.get("stripe_refresh_url"),
    });

    return [data, res];
  }

  async getConnectedAccounts(): Promise<Stripe.Account[]> {
    const { data } = await this.stripe.accounts.list();
    return data;
  }

  async getConnectedAccountById(
    stripeConnectedId: string
  ): Promise<Stripe.Account> {
    const data = await this.stripe.accounts.retrieve(stripeConnectedId);
    return data;
  }

  constructStripeEvent(body: any, headers: any): Stripe.Event {
    const signature = headers["stripe-signature"];
    try {
      const event = this.stripe.webhooks.constructEvent(
        body,
        signature,
        this.webhookSecret
      );
      return event;
    } catch (err) {
      //@ts-ignore
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
    currency: string = "usd"
  ): Promise<Stripe.PaymentIntent> {
    const totalAmount = input.items.reduce(
      (acc, curr) => acc + curr.totalPrice,
      0
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
        this.applicationFeePercent * item.totalPrice - item.totalPrice
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
    description?: string
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
    description?: string
  ): Promise<Stripe.Product> {
    const product = await this.stripe.products.create({
      name: name,
      shippable: false,
      description,
    });
    return product;
  }

  async createPrice(price: Stripe.PriceCreateParams) {
    return this.stripe.prices.create(price);
  }

  async createMonthlyPrice(
    stripeProductId: string,
    priceInCents: number,
    currency: string = "usd",
    name?: string
  ): Promise<Stripe.Price> {
    const price = await this.stripe.prices.create({
      currency,
      nickname: name,
      product: stripeProductId,
      unit_amount: priceInCents,
      recurring: { interval: "month" },
    });

    return price;
  }

  async createStripeTieredPrice(
    stripeProductId: string,
    tiers: {
      priceInCents: number;
      limit: number | "inf";
    }[],
    recuring: "month" | "year" | "day" | "week",
    currency: string = "usd",
    name?: string
  ): Promise<Stripe.Price> {
    let _tiers = tiers;

    _tiers.splice(tiers.length - 1, 1, {
      limit: "inf",
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
        interval: recuring,
        usage_type: "metered",
      },
      product: stripeProductId,
      tiers_mode: "graduated",
      billing_scheme: "tiered",
      expand: ["tiers"],
    });

    return price;
  }

  async updateSubscriptionItemUsage(
    itemId: string,
    usage: number
  ): Promise<Stripe.UsageRecord> {
    const usageRecord = await this.stripe.subscriptionItems.createUsageRecord(
      itemId,
      { quantity: usage, timestamp: "now" }
    );
    return usageRecord;
  }

  async createCustomerSubscription(
    customerId: string,
    priceIds: string[],
    metadata?: any
  ): Promise<{ subscriptionObj: Stripe.Subscription; clientSecret: string }> {
    if (!customerId || !Array.isArray(priceIds) || priceIds.length < 1)
      throw new InternalServerErrorException();
    const subscription = await this.stripe.subscriptions.create({
      customer: customerId,
      items: priceIds.map((v) => ({ price: v, quantity: 1 })),
      metadata,
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
    });

    const clientSecret =
      //@ts-ignore
      subscription.latest_invoice?.["payment_intent"]?.[
        "client_secret"
      ] as string;

    return { clientSecret, subscriptionObj: subscription };
  }

  async deleteCustomerSubscription(subId: string) {
    return this.stripe.subscriptions.del(subId, { prorate: true });
  }

  async updateCustomerSubscriptionPrice(
    subscriptionId: string,
    priceId: string
  ): Promise<Stripe.Subscription> {
    const subscription = await this.stripe.subscriptions.update(
      subscriptionId,
      {
        items: [{ price: priceId }],
      }
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
    email?: string
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
    externalAccountId: methodId,
  }: {
    connectedAccId: string;
    amount: number;
    currency: string;
    externalAccountId: string;
  }) {
    return await this.stripe.payouts.create(
      {
        amount,
        currency,
        destination: methodId,
      },
      {
        stripeAccount: connectedAccId,
      }
    );
  }

  onModuleInit() {}
}
