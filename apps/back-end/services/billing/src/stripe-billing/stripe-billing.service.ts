import { CheckoutInput } from '@dto';
import {
  BadRequestException,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
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
  GetShopVouchersMessageReply,
} from 'nest-dto';

interface FormatedData<TData> {
  shopId: string;
  products: TData;
}

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
    return this.StripeService.getConnectedAccounts();
  }

  async checkout(userId: string, input: CheckoutInput) {
    // const { billingAddressId } = input;
    // const {} = await this.billingAddressService.getBillingAddressById(
    //   userId,
    //   billingAddressId,
    // );
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

    const formatedData: FormatedData<typeof data>[] = data.reduce(
      (acc, curr) => {
        const shopIdx = acc.findIndex((shop) => shop.shopId === curr.shopId);
        const shopExists = shopIdx > -1;
        if (shopExists) {
          acc[shopIdx].products.push(curr);
          return acc;
        } else {
          return [{ shopId: curr.shopId, products: [curr] }, ...acc];
        }
      },
      [] as FormatedData<typeof data>[],
    );

    console.log('formated data', formatedData);
  }

  async setupStripeConnectedAccount() {
    const accounts = await this.getStripeConnectedAccounts();
    return this.StripeService.createdStripeAccountLink(accounts[0].id);
  }
}
