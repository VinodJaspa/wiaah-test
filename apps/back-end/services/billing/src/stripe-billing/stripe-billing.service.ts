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

import { StripeService } from 'nest-utils';
import { CreateStripeConnectedAccountCommand } from '@stripe-billing/commands';
import {
  CheckoutMetadata,
  CheckoutMetadataProduct,
} from '@stripe-billing/types';
import { ProductTypeEnum, StripeMetadataType } from '@stripe-billing/const';
import { PrismaService } from 'prismaService';

interface FormatedData {
  providerId: string;
  providerStripeId: string;
  items: {
    id: string;
    qty: number;
    type: string;
    title: string;
  }[];
  totalPrice: number;
}

@Injectable()
export class StripeBillingService {
  constructor(
    private readonly StripeService: StripeService,
    @Inject(SERVICES.BILLING_SERVICE.token)
    private readonly eventsClient: ClientKafka,
    private readonly commandBus: CommandBus,
    private readonly prisma: PrismaService,
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
    if (user.stripeId)
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
    console.log('no shop cart', { data, success, error });
    if (!success) throw error;

    console.log('shop cart', { data, success, error });
    const { items } = data;

    if (items.length < 1) throw new BadRequestException('empty shopping cart');

    const serviceProducts = items.filter((v) =>
      this.servicesType.includes(v.type),
    );
    const hasServiceProducts = serviceProducts && serviceProducts.length > 0;

    const serviceProductsCheckoutPromise = hasServiceProducts
      ? KafkaMessageHandler<
          string,
          GetServicesCheckoutDataMessage,
          GetServicesCheckoutDataMessageReply
        >(
          this.eventsClient,
          KAFKA_MESSAGES.SERVICES_MESSAGES.getServicesCheckoutData,
          new GetServicesCheckoutDataMessage({
            services: serviceProducts,
          }),
        )
      : new GetServicesCheckoutDataMessageReply({
          data: { services: [] },
          error: null,
          success: true,
        });

    const products = items
      .filter((v) => this.productsType.includes(v.type))
      .map((v) => ({
        id: v.id,
        qty: v.qty,
      }));

    const hasProducts = products && products.length > 0;

    const productsCheckoutPromise = hasProducts
      ? KafkaMessageHandler<
          string,
          GetProductsCheckoutDataMessage,
          GetProductsCheckoutDataMessageReply
        >(
          this.eventsClient,
          KAFKA_MESSAGES.PRODUCTS_MESSAGES.getProductsCheckoutData,
          new GetProductsCheckoutDataMessage({
            products: products,
          }),
        )
      : new GetProductsCheckoutDataMessageReply({
          data: { products: [] },
          error: null,
          success: true,
        });

    const {
      results: { data: scData, error: scError, success: scSuccess },
    } = await serviceProductsCheckoutPromise;

    const {
      results: { data: pcData, error: pcError, success: pcSuccess },
    } = await productsCheckoutPromise;

    const formatedItems: FormatedData[] = scData.services
      .reduce((acc, curr) => {
        const seller: FormatedData = acc.find(
          (v) => v.providerId === curr.sellerId,
        );

        const updatedSeller: FormatedData = seller
          ? {
              ...seller,
              items: [
                ...seller.items,
                {
                  id: curr.id,
                  title: curr.title,
                  qty: 1,
                  type: ProductTypeEnum.service,
                },
              ],
            }
          : {
              providerId: curr.sellerId,
              providerStripeId: curr.sellerStripeId,
              totalPrice: curr.price,
              items: [
                {
                  id: curr.id,
                  title: curr.title,
                  qty: 1,
                  type: ProductTypeEnum.service,
                },
              ],
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
                totalPrice: seller.totalPrice + curr.price * curr.qty,
                items: [
                  ...seller.items,
                  {
                    id: curr.id,
                    title: curr.title,
                    qty: curr.qty,
                    type: ProductTypeEnum.product,
                  },
                ],
              }
            : {
                providerId: curr.sellerId,
                providerStripeId: curr.sellerStripeId,
                totalPrice: curr.price * curr.qty,
                items: [
                  {
                    id: curr.id,
                    title: curr.title,
                    qty: curr.qty,
                    type: ProductTypeEnum.product,
                  },
                ],
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

    if (!allunique) throw new InternalServerErrorException();

    const sellersMetaData: CheckoutMetadata = {
      buyerId: user.id,
      type: StripeMetadataType.checkout,
      sellers: formatedItems.map((v) => ({
        id: v.providerId,
        products: v.items.map(
          (v) =>
            ({
              id: v.id,
              qty: v.qty,
              type: v.type,
            }) as CheckoutMetadataProduct,
        ),
      })),
    };

    const res = await this.StripeService.createPaymentIntent({
      buyerId: user.id,
      items: formatedItems.map((v) => ({
        sellerStripeId: v.providerStripeId,
        totalPrice: v.totalPrice,
      })),
      meta: sellersMetaData,
    });

    return res.client_secret;
  }
}
