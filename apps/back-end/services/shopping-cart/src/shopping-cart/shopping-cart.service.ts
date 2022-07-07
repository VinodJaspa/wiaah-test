import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CartItem } from '@prisma-client';
import { PrismaService } from 'src/prisma.service';
import { ShoppingCart } from '@entities';
import {
  AuthorizationDecodedUser,
  KafkaMessageHandler,
  KAFKA_EVENTS,
  KAFKA_MESSAGES,
  KAFKA_SERVICE_TOKEN,
  SERVICES,
} from 'nest-utils';
import { ClientKafka } from '@nestjs/microservices';
import {
  ApplyableVoucherMessage,
  ApplyableVoucherMessageReply,
  GetProductMetaDataMessage,
  GetProductMetaDataMessageReply,
  GetServiceMetaDataMessage,
  GetServiceMetaDataMessageReply,
  VoucherAppliedEvent,
} from 'nest-dto';
import {
  AddShoppingCartItemInput,
  ApplyVoucherInput,
  RemoveShoppingCartItemInput,
} from '@dto';

@Injectable()
export class ShoppingCartService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(SERVICES.PRODUCTS_SERVICE.token)
    private readonly productsClient: ClientKafka,
    @Inject(SERVICES.SERVICES_SERIVCE.token)
    private readonly ServicesClient: ClientKafka,
    @Inject(SERVICES.VOUCHERS_SERVICE.token)
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

  getShoppingCartByOwnerId(ownerId: string): Promise<ShoppingCart> {
    return this.prisma.cart.findUnique({
      where: {
        ownerId,
      },
      rejectOnNotFound(error) {
        throw new NotFoundException(
          'could not find a shopping cart for this account',
        );
      },
    });
  }

  async addProduct(
    user: AuthorizationDecodedUser,
    product: AddShoppingCartItemInput,
  ): Promise<CartItem> {
    const {
      results: { data, error, success },
    } = await KafkaMessageHandler<
      string,
      GetProductMetaDataMessage,
      GetProductMetaDataMessageReply
    >(
      this.productsClient,
      KAFKA_MESSAGES.PRODUCTS_MESSAGES.getProductMetaData,
      new GetProductMetaDataMessage({
        productId: product.itemId,
        userId: user.id,
      }),
      'fetch product metadata timed out',
    );
    if (!success) throw new Error(error);
    const { name, price, thumbnail, shopId } = data;
    const newCartItem: CartItem = {
      itemId: product.itemId,
      quantity: product.quantity,
      itemType: product.itemType,
      providerId: shopId,
      name,
      price,
      thumbnail,
    };

    const hasitem = await this.alreadyHasItem(user.id, product.itemId);

    if (hasitem) {
      await this.incressShoppingCartItem(user.id, product.itemId);

      return newCartItem;
    }

    await this.prisma.cart.update({
      where: {
        ownerId: user.id,
      },
      data: {
        cartItems: {
          push: newCartItem,
        },
      },
    });

    return newCartItem;
  }

  async alreadyHasItem(userId: string, itemId: string): Promise<boolean> {
    const item = await this.prisma.cart.findUnique({
      where: {
        ownerId: userId,
      },
      select: {
        cartItems: {
          select: {
            itemId: true,
          },
        },
      },
    });
    const { cartItems } = item;
    const hasItem = cartItems.findIndex((item) => item.itemId === itemId) > -1;

    return hasItem;
  }

  async incressShoppingCartItem(
    ownerId: string,
    itemId: string,
    amount: number = 1,
  ) {
    return this.prisma.cart.update({
      where: {
        ownerId,
      },
      data: {
        cartItems: {
          updateMany: {
            where: {
              itemId,
            },
            data: {
              quantity: {
                increment: amount,
              },
            },
          },
        },
      },
    });
  }

  async addService(
    user: AuthorizationDecodedUser,
    service: AddShoppingCartItemInput,
  ): Promise<CartItem> {
    const {
      results: {
        data: { name, price, thumbnail },
        error,
        success,
      },
    } = await KafkaMessageHandler<
      string,
      GetServiceMetaDataMessage,
      GetServiceMetaDataMessageReply
    >(
      this.productsClient,
      KAFKA_MESSAGES.SERVICES_MESSAGES.getServiceMetaData,
      new GetServiceMetaDataMessage({
        serviceId: service.itemId,
        userId: user.id,
      }),
    );
    if (!success) throw new Error(error);

    const newCartItem: CartItem = {
      itemId: service.itemId,
      itemType: service.itemType,
      quantity: service.quantity,
      providerId: null,
      name,
      price,
      thumbnail,
    };

    await this.prisma.cart.update({
      where: {
        ownerId: user.id,
      },
      data: {
        cartItems: {
          push: newCartItem,
        },
      },
    });

    return newCartItem;
  }

  async removeItem(
    user: AuthorizationDecodedUser,
    input: RemoveShoppingCartItemInput,
  ) {
    await this.prisma.cart.update({
      where: {
        ownerId: user.id,
      },
      data: {
        cartItems: {
          deleteMany: {
            where: {
              itemId: input.itemId,
            },
          },
        },
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
        cartItems: [],
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

    if (!success) throw new Error(error);

    const {
      applyable,
      amount,
      code,
      convertedAmount,
      currency,
      convertedToCurrency,
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
        appliedVoucher: {
          amount,
          code,
          currency,
          convertedAmount,
          convertedToCurrency,
        },
      },
    });
  }
}
