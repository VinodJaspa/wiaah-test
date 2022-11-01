import { CheckoutInput } from '@dto';
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
  AuthorizationDecodedUser,
  KafkaMessageHandler,
  KAFKA_MESSAGES,
  SERVICES,
} from 'nest-utils';
import {
  GetProductsCheckoutDataMessage,
  GetProductsCheckoutDataMessageReply,
  GetServicesCheckoutDataMessage,
  GetServicesCheckoutDataMessageReply,
  GetShoppingCartItemsMessage,
  GetShoppingCartItemsMessageReply,
  UserHasStripeAccountMessage,
  UserHasStripeAccountMessageReply,
} from 'nest-dto';
import { CommandBus } from '@nestjs/cqrs';

import { BillingAddressService } from '../billing-address/billing-address.service';
import { StripeService } from '../stripe/stripe.service';
import { CreateStripeConnectedAccountCommand } from './commands';

interface FormatedData {
  providerId: string;
  providerStripeId: string;
  items: {
    id: string;
    title: string;
  }[];
  totalPrice: number;
}

@Injectable()
export class StripeBillingService {
  constructor(
    private readonly StripeService: StripeService,
    private readonly billingAddressService: BillingAddressService,
    @Inject(SERVICES.BILLING_SERVICE.token)
    private readonly eventsClient: ClientKafka,
    private readonly commandBus: CommandBus,
  ) {}

  servicesType = [
    'hotel-room',
    'restaurant',
    'health-center',
    'beauty-center',
    'vehicle',
    'holiday-rentals',
  ];

  productsType = ['shop', 'product'];

  async createStripeConnectedAccount(
    user: AuthorizationDecodedUser,
  ): Promise<{ url: string }> {
    const stripeId = user.stripeId;

    if (stripeId)
      throw new UnprocessableEntityException(
        'this account already has an stripe connected account',
      );

    const checkHasStripeId = await this.userHasStripeAccount(user.id);

    if (checkHasStripeId)
      throw new UnprocessableEntityException(
        'this account already has an stripe connected account',
      );

    const res = await this.commandBus.execute<
      CreateStripeConnectedAccountCommand,
      string
    >(new CreateStripeConnectedAccountCommand(user.id));

    return {
      url: res,
    };
  }
  getStripeConnectedAccounts() {
    return this.StripeService.getConnectedAccounts();
  }

  async userHasStripeAccount(userId: string): Promise<boolean> {
    const {
      results: { data, error, success },
    } = await KafkaMessageHandler<
      string,
      UserHasStripeAccountMessage,
      UserHasStripeAccountMessageReply
    >(
      this.eventsClient,
      KAFKA_MESSAGES.ACCOUNTS_MESSAGES.hasStripeId,
      new UserHasStripeAccountMessage({
        userId,
      }),
    );

    if (!success) throw error;

    return data.hasAccount;
  }

  async checkout(user: AuthorizationDecodedUser): Promise<string> {
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
        ownerId: user.id,
      }),
    );

    if (!success) throw error;

    const { items, voucherId } = data;

    if (items.length < 1) throw new BadRequestException('empty shopping cart');

    const {
      results: { data: scData, error: scError, success: scSuccess },
    } = await KafkaMessageHandler<
      string,
      GetServicesCheckoutDataMessage,
      GetServicesCheckoutDataMessageReply
    >(
      this.eventsClient,
      KAFKA_MESSAGES.SERVICES_MESSAGES.getServicesCheckoutData,
      new GetServicesCheckoutDataMessage({
        services: items.filter((v) => this.servicesType.includes(v.type)),
      }),
    );

    const {
      results: { data: pcData, error: pcError, success: pcSuccess },
    } = await KafkaMessageHandler<
      string,
      GetProductsCheckoutDataMessage,
      GetProductsCheckoutDataMessageReply
    >(
      this.eventsClient,
      KAFKA_MESSAGES.PRODUCTS_MESSAGES.getProductsCheckoutData,
      new GetProductsCheckoutDataMessage({
        products: items
          .filter((v) => this.productsType.includes(v.type))
          .map((v) => ({
            id: v.id,
            qty: v.qty,
          })),
      }),
    );

    const formatedItems: FormatedData[] = scData.services
      .reduce((acc, curr) => {
        const seller: FormatedData = acc.find(
          (v) => v.providerId === curr.sellerId,
        );
        const updatedSeller: FormatedData = seller
          ? {
              ...seller,
              items: [...seller.items, { id: curr.id, title: curr.title }],
            }
          : {
              providerId: curr.sellerId,
              providerStripeId: curr.sellerStripeId,
              totalPrice: curr.price,
              items: [{ id: curr.id, title: curr.title }],
            };

        return [
          ...acc.filter((v) => v.providerId !== seller.providerId),
          updatedSeller,
        ];
      }, [] as FormatedData[])
      .concat(
        pcData.products.reduce((acc, curr) => {
          const seller: FormatedData = acc.find(
            (v) => v.providerId === curr.sellerId,
          );

          const updatedProduct: FormatedData = seller
            ? {
                ...seller,
                items: [...seller.items, { id: curr.id, title: curr.title }],
              }
            : {
                providerId: curr.sellerId,
                providerStripeId: curr.sellerStripeId,
                totalPrice: curr.price,
                items: [{ id: curr.id, title: curr.title }],
              };

          return [
            ...(seller
              ? acc.filter((v) => v.providerId === seller.providerId)
              : acc),
            updatedProduct,
          ];
        }, [] as FormatedData[]),
      );

    const allunique: boolean = formatedItems
      .reduce((acc, curr, _, arr) => {
        const items = arr.filter((v) => v.providerId === curr.providerId);
        return acc.concat(items.length === 1 ? true : false);
      }, [] as boolean[])
      .every((v) => v);

    console.log({ formatedItems, allunique });

    if (!allunique) throw new InternalServerErrorException();

    const res = await this.StripeService.createPaymentIntent({
      buyerId: user.id,
      items: formatedItems.map((v) => ({
        sellerStripeId: v.providerStripeId,
        totalPrice: v.totalPrice,
      })),
    });

    return res.client_secret;
  }
}
