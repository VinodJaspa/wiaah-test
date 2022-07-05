import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CartItem } from '@prisma-client';
import { PrismaService } from 'src/prisma.service';
import { ShoppingCart } from './entities/shopping-cart.entity';
import {
  AuthorizationDecodedUser,
  KafkaMessageHandler,
  KAFKA_MESSAGES,
  SERVICES,
} from 'nest-utils';
import { ClientKafka } from '@nestjs/microservices';
import {
  GetProductMetaDataMessage,
  GetProductMetaDataMessageReply,
  GetServiceMetaDataMessage,
  GetServiceMetaDataMessageReply,
} from 'nest-dto';
import { RemoveShoppingCartItemInput } from './dto/removeItem.input';
import { AddShoppingCartItemInput } from './dto/addItem.input';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ShoppingCartService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(SERVICES.PRODUCTS_SERVICE.token)
    private readonly productsClient: ClientKafka,
    @Inject(SERVICES.SERVICES_SERIVCE.token)
    private readonly ServicesClient: ClientKafka,
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
}
