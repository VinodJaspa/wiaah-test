import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'prismaService';
import { ShoppingCart, CartProduct } from '@entities';
import {
  AuthorizationDecodedUser,
  DBErrorException,
  KafkaMessageHandler,
  KAFKA_EVENTS,
  KAFKA_MESSAGES,
  SERVICES,
} from 'nest-utils';
import { ClientKafka } from '@nestjs/microservices';
import {
  ApplyableVoucherMessage,
  ApplyableVoucherMessageReply,
  GetProductMetaDataMessage,
  GetProductMetaDataMessageReply,
  VoucherAppliedEvent,
} from 'nest-dto';
import {
  AddShoppingCartProductItemInput,
  ApplyVoucherInput,
  RemoveShoppingCartItemInput,
} from '@dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ShoppingCartService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(SERVICES.SHOPPING_CART_SERVICE.token)
    private readonly eventsClient: ClientKafka,
  ) {}

  async createShoppingCart(ownerId: string): Promise<boolean> {
    const cartExists = await this.ownerCartExists(ownerId);
    if (cartExists)
      throw new UnprocessableEntityException(
        'this account id already own a shopping cart, each account can own only one cart',
      );

    await this.prisma.cart.create({
      data: {
        ownerId,
      },
    });

    return true;
  }

  async ownerCartExists(ownerId: string): Promise<boolean> {
    const cart = await this.prisma.cart.findUnique({
      where: {
        ownerId,
      },
    });
    return !!cart;
  }

  getShoppingCarts() {
    return this.prisma.cart.findMany();
  }

  async getShoppingCartByOwnerId(ownerId: string): Promise<ShoppingCart> {
    const res = await this.prisma.cart.findUnique({
      where: {
        ownerId,
      },
      rejectOnNotFound(error) {
        throw new NotFoundException(
          'could not find a shopping cart for this account',
        );
      },
    });

    return res;
  }

  async addProduct(
    user: AuthorizationDecodedUser,
    product: AddShoppingCartProductItemInput,
  ): Promise<CartProduct> {
    const {
      results: { data, error, success },
    } = await KafkaMessageHandler<
      string,
      GetProductMetaDataMessage,
      GetProductMetaDataMessageReply
    >(
      this.eventsClient,
      KAFKA_MESSAGES.PRODUCTS_MESSAGES.getProductMetaData,
      new GetProductMetaDataMessage({
        productId: product.itemId,
        userId: user.id,
      }),
      'fetch product metadata timed out',
    );
    if (!success) throw error;
    data;
    const newCartItem: CartProduct = {
      id: uuid(),
      productId: product.itemId,
      shippingRuleId: product.shippingRuleId,
    };

    // const hasitem = await this.alreadyHasItem(user.id, product.itemId);

    // if (hasitem) {
    //   await this.incressShoppingCartItem(
    //     user.id,
    //     product.itemId,
    //     product.quantity,
    //   );

    //   return newCartItem;
    // }

    await this.prisma.cart.update({
      where: {
        ownerId: user.id,
      },
      data: {
        cartProducts: {
          push: newCartItem,
        },
      },
    });

    return newCartItem;
  }

  // async alreadyHasItem(userId: string, itemId: string): Promise<boolean> {
  //   const item = await this.prisma.cart.findUnique({
  //     where: {
  //       ownerId: userId,
  //     },
  //     select: {
  //       cartItems: {
  //         select: {
  //           itemId: true,
  //         },
  //       },
  //     },
  //     rejectOnNotFound() {
  //       throw new NotFoundException(
  //         'could not find shopping cart record for this user',
  //       );
  //     },
  //   });
  //   const { cartItems } = item;
  //   const hasItem = cartItems.findIndex((item) => item.itemId === itemId) > -1;

  //   return hasItem;
  // }

  // async incressShoppingCartItem(
  //   ownerId: string,
  //   itemId: string,
  //   amount: number = 1,
  // ) {
  //   return this.prisma.cart.update({
  //     where: {
  //       ownerId,
  //     },
  //     data: {
  //       cartItems: {
  //         updateMany: {
  //           where: {
  //             itemId,
  //           },
  //           data: {
  //             quantity: {
  //               increment: amount,
  //             },
  //           },
  //         },
  //       },
  //     },
  //   });
  // }

  // async addService(
  //   user: AuthorizationDecodedUser,
  //   service: AddShoppingCartServiceItemInput,
  // ): Promise<BookedService> {
  //   const {
  //     results: { data, error, success },
  //   } = await KafkaMessageHandler<
  //     string,
  //     GetServiceMetaDataMessage,
  //     GetServiceMetaDataMessageReply
  //   >(
  //     this.eventsClient,
  //     KAFKA_MESSAGES.SERVICES_MESSAGES.getServiceMetaData,
  //     new GetServiceMetaDataMessage({
  //       serviceId: service.itemId,
  //       userId: user.id,
  //     }),
  //   );
  //   if (!success) throw error;
  //   const { name, price, providerId, thumbnail } = data;
  //   const newCartItem: BookedService = {
  //     id: uuid(),
  //     cancelationPolicyId:service,
  //   };

  //   await this.prisma.cart.update({
  //     where: {
  //       ownerId: user.id,
  //     },
  //     data: {
  //       cartServices: {
  //         push: newCartItem,
  //       },
  //     },
  //   });

  //   return newCartItem;
  // }

  async removeItem(
    user: AuthorizationDecodedUser,
    input: RemoveShoppingCartItemInput,
  ) {
    await this.prisma.cart.update({
      where: {
        ownerId: user.id,
      },
      data: {
        cartProducts:
          input.type === 'product'
            ? {
                deleteMany: {
                  where: {
                    id: input.itemId,
                  },
                },
              }
            : undefined,
        cartServices:
          input.type === 'service'
            ? {
                deleteMany: {
                  where: {
                    id: input.itemId,
                  },
                },
              }
            : undefined,
      },
    });

    return true;
  }

  clearShoppingCart(ownerId: string): Promise<ShoppingCart> {
    return this.prisma.cart.update({
      where: {
        ownerId,
      },
      data: {
        cartProducts: [],
        cartServices: [],
      },
    });
  }

  async applyVoucher(
    userId: string,
    input: ApplyVoucherInput,
  ): Promise<ShoppingCart> {
    const {
      results: { data, error, success },
    } = await KafkaMessageHandler<
      any,
      ApplyableVoucherMessage,
      ApplyableVoucherMessageReply
    >(
      this.eventsClient,
      KAFKA_MESSAGES.VOUCHERS_MESSAGES.isApplyableVoucher,
      new ApplyableVoucherMessage({ userId, voucherCode: input.voucherCode }),
      'failed to validate voucher code, please try again later',
    );

    if (!success) throw error;

    const {
      applyable,
      amount,
      code,
      convertedAmount,
      currency,
      convertedToCurrency,
      voucherId,
    } = data;

    if (!applyable)
      throw new BadRequestException(
        'this voucher is not applyable to your cart, please try another valid code',
      );
    this.eventsClient.emit<any, VoucherAppliedEvent>(
      KAFKA_EVENTS.VOUCHER_EVENTS.voucherApplied,
      new VoucherAppliedEvent({
        code,
        userId,
        amount,
        convertedAmount,
        currency,
      }),
    );
    return this.prisma.cart.update({
      where: {
        ownerId: userId,
      },
      data: {
        appliedVoucherId: voucherId,
      },
    });
  }

  async removeVoucher(userId: string): Promise<ShoppingCart> {
    try {
      return await this.prisma.cart.update({
        where: {
          ownerId: userId,
        },
        data: {
          appliedVoucherId: null,
        },
      });
    } catch (error) {
      throw new DBErrorException('error removing voucher');
    }
  }
}
