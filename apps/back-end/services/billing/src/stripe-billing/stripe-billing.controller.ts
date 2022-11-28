import {
  BadRequestException,
  Controller,
  Headers,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { CommandBus, EventBus } from '@nestjs/cqrs';
import { EventPattern, Payload } from '@nestjs/microservices';
import {
  BillingMonthlyPriceCreatedEvent,
  MembershipCreatedEvent,
  SellerAccountCreatedEvent,
  SellerRevenueIncreasedEvent,
} from 'nest-dto';
import { KAFKA_EVENTS } from 'nest-utils';
import Stripe from 'stripe';
import { Response } from 'express';

import { StripeService } from '@stripe';
import {
  CreateStripeCustomerCommand,
  CreateStripeMonthlyPriceCommand,
  CreateStripeProductCommand,
  StripeProductCommandRes,
  UpdateMembershipUsageCommand,
} from '@stripe-billing/commands';
import { ProductTypeEnum } from '@stripe-billing/const';
import {
  StripeCheckoutInvoicePaidEvent,
  StripeInvoicePaidEvent,
  StripeSubscriptionPaidEvent,
} from '@stripe-billing/events';
import { ServiceBookedEvent } from 'nest-dto';
import {
  CheckoutMetadata,
  StripeMetadataObjectType,
  SubscriptionMetadata,
} from '@stripe-billing/types';

@Controller()
export class StripeBillingController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly stripeService: StripeService,
    private readonly eventBus: EventBus,
  ) {}

  @Post('/webhook')
  handleStripeWebhookEvent(
    @Headers() headers: any,
    @Res() res: Response,
    @Req() req: any,
  ) {
    const event = this.stripeService.constructStripeEvent(req.rawBody, headers);

    if (!event) throw new BadRequestException('bad webhook signiture');
    // Handle the event
    switch (event.type) {
      case 'customer.subscription.updated':
        const res = event.data.object as Stripe.Subscription;
        const subMeta = res.metadata as unknown as SubscriptionMetadata;
        if (res.status === 'active') {
          console.log('publishing');
          this.eventBus.publish(new StripeSubscriptionPaidEvent(subMeta));
        }
        break;
      case 'invoice.paid':
        const invoice = event.data.object as Stripe.Invoice;
        const invoiceMeta = invoice.metadata as unknown as {
          type: StripeMetadataObjectType;
        };
        switch (invoiceMeta.type) {
          case 'checkout':
            this.eventBus.publish(new StripeInvoicePaidEvent(invoice));
            break;
          default:
            break;
        }
        break;

      case 'payment_intent.succeeded':
        const intent = event.data.object as Stripe.PaymentIntent;
        console.log({ intent });
        break;
      default:
        console.log(`Unhandled event type ${event.type}. 🌟`);
    }

    res.send();
  }

  @EventPattern(KAFKA_EVENTS.ACCOUNTS_EVENTS.sellerAccountCreated)
  handleSellerAccountCreated(
    @Payload() { value }: { value: SellerAccountCreatedEvent },
  ) {
    this.commandBus.execute<CreateStripeCustomerCommand>(
      new CreateStripeCustomerCommand(
        value.input.email,
        `${value.input.firstName} ${value.input.lastName}`,
        value.input.id,
      ),
    );
  }

  @EventPattern(KAFKA_EVENTS.BILLING_EVNETS.createMonthlyBillingPrice)
  async handleCreatePrice(
    @Payload() { value }: { value: BillingMonthlyPriceCreatedEvent },
  ) {
    const stripeProduct = await this.commandBus.execute<
      CreateStripeProductCommand,
      StripeProductCommandRes
    >(
      new CreateStripeProductCommand({
        name: 'test name',
        productId: value.input.id,
        type: value.input.type,
      }),
    );

    this.commandBus.execute<CreateStripeMonthlyPriceCommand>(
      new CreateStripeMonthlyPriceCommand({
        priceInCents: value.input.price,
        productOgId: value.input.id,
        productType: value.input.type,
        stripeProductId: stripeProduct.stripeProductId,
      }),
    );
  }

  @EventPattern(KAFKA_EVENTS.MEMBERSHIP.memberShipCreated)
  async handleNewMembership(
    @Payload() { value }: { value: MembershipCreatedEvent },
  ) {
    console.log('created member', JSON.stringify(value, null, 2));
    const stripeProduct = await this.commandBus.execute<
      CreateStripeProductCommand,
      StripeProductCommandRes
    >(
      new CreateStripeProductCommand({
        name: value.input.name,
        productId: value.input.id,
        type: ProductTypeEnum.membership,
      }),
    );

    this.commandBus.execute<CreateStripeMonthlyPriceCommand>(
      new CreateStripeMonthlyPriceCommand({
        priceInCents: value.input.price,
        productOgId: value.input.id,
        productType: ProductTypeEnum.membership,
        stripeProductId: stripeProduct.stripeProductId,
      }),
    );
  }
  @EventPattern(KAFKA_EVENTS.SELLER.revenueIncreased)
  handleSellerRevenueIncreased(
    @Payload() { value }: { value: SellerRevenueIncreasedEvent },
  ) {
    this.commandBus.execute<UpdateMembershipUsageCommand>(
      new UpdateMembershipUsageCommand('', value.input.allTimeRevenue),
    );
  }
}
