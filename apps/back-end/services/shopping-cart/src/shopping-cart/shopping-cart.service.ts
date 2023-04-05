import {
  BadRequestException,
  Inject,
  Injectable,
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
  AddShoppingCartItemInput,
  ApplyVoucherInput,
  RemoveShoppingCartItemInput,
} from '@dto';

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
    let res = await this.prisma.cart.findUnique({
      where: {
        ownerId,
      },
    });

    if (!res) res = await this.prisma.cart.create({ data: { ownerId } });

    return res;
  }

  async addProduct(
    user: AuthorizationDecodedUser,
    product: AddShoppingCartItemInput,
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

    const res = await this.prisma.cartProduct.create({
      data: {
        ownerId: user.id,
        attributesJson: product.attributesJson,
        productId: product.itemId,
        shippingRuleId: product.shippingRuleId,
      },
    });

    return res;
  }

  async removeItem(
    user: AuthorizationDecodedUser,
    input: RemoveShoppingCartItemInput,
  ) {
    const res =
      input.type === 'product'
        ? await this.prisma.cartProduct.delete({
            where: {
              id: input.itemId,
            },
          })
        : await this.prisma.bookedService.delete({
            where: {
              id: input.itemId,
            },
          });

    return true;
  }

  async clearShoppingCart(ownerId: string): Promise<boolean> {
    await this.prisma.$transaction([
      this.prisma.cartProduct.deleteMany({
        where: {
          ownerId,
        },
      }),
    ]);

    return true;
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
