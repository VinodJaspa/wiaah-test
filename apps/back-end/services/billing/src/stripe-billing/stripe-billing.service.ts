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
  SERVICES,
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
  totalPrice: number;
}

@Injectable()
export class StripeBillingService {
  constructor(
    private readonly StripeService: StripeService,
    private readonly billingAddressService: BillingAddressService,
    @Inject(SERVICES.BILLING_SERVICE.token)
    private readonly eventsClient: ClientKafka,
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
    const { items, voucher } = data;
    if (items.length < 1) throw new BadRequestException('empty shopping cart');

    const formatedData: FormatedData<typeof items>[] = items.reduce(
      (acc, curr) => {
        const shopIdx = acc.findIndex((shop) => shop.shopId === curr.shopId);
        const shopExists = shopIdx > -1;
        if (shopExists) {
          acc[shopIdx].products.push(curr);
          acc[shopIdx].totalPrice += curr.price;
          return acc;
        } else {
          return [
            { shopId: curr.shopId, products: [curr], totalPrice: curr.price },
            ...acc,
          ];
        }
      },
      [] as FormatedData<typeof items>[],
    );
    const totalPrice = formatedData.reduce((acc, curr) => {
      return acc + curr.totalPrice;
    }, 0);

    console.log('formated data', formatedData, voucher, totalPrice);
  }

  async setupStripeConnectedAccount() {
    const accounts = await this.getStripeConnectedAccounts();
    return this.StripeService.createdStripeAccountLink(accounts[0].id);
  }
}
