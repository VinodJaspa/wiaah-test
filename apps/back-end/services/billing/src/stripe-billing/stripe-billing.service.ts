import { CheckoutInput } from '@dto';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
  KafkaMessageHandler,
  KAFKA_MESSAGES,
  KAFKA_SERVICE_TOKEN,
} from 'nest-utils';
import { BillingAddressService } from 'src/billing-address/billing-address.service';
import { StripeService } from 'src/stripe/stripe.service';
import {
  GetShoppingCartItemsMessage,
  GetShoppingCartItemsMessageReply,
} from 'nest-dto';

@Injectable()
export class StripeBillingService {
  constructor(
    private readonly StripeService: StripeService,
    private readonly billingAddressService: BillingAddressService,
    @Inject(KAFKA_SERVICE_TOKEN) private readonly eventsClient: ClientKafka,
  ) {}

  createdStripeConnectedAccount() {
    return this.StripeService.createdConnectedAccount();
  }
  getStripeConnectedAccounts() {
    // this.StripeService.createPaymentIntent(12323);
    return this.StripeService.getConnectedAccounts();
  }

  async checkout(userId: string, input: CheckoutInput) {
    const { billingAddressId } = input;
    const {} = await this.billingAddressService.getBillingAddressById(
      userId,
      billingAddressId,
    );
    const {
      results: { data, error, success },
    } = await KafkaMessageHandler<
      any,
      GetShoppingCartItemsMessage,
      GetShoppingCartItemsMessageReply
    >(
      this.eventsClient,
      KAFKA_MESSAGES.SHOPPING_CART_MESSAGES.getShoppingCartItems,
      new GetShoppingCartItemsMessage({
        ownerId: userId,
      }),
    );

    if (!success) throw new Error(error);
    if (data.length < 1) throw new BadRequestException('empty shopping cart');
  }

  async setupStripeConnectedAccount() {
    const accounts = await this.getStripeConnectedAccounts();
    return this.StripeService.createdStripeAccountLink(accounts[0].id);
  }
}
