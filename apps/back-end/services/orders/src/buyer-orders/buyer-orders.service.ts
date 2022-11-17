import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { SellerOrdersCluster } from '@prisma-client';
import {
  hasFilters,
  generateFiltersOfArgs,
  KAFKA_SERVICE_TOKEN,
  KafkaMessageHandler,
  KAFKA_MESSAGES,
  SERVICES,
} from 'nest-utils';
import { Order } from '@entities';
import { PrismaService } from 'prismaService';
import {
  AcceptReceivedOrderInput,
  placeOrderInput,
  GetBuyerOrdersInput,
  RejectRecievedOrderInput,
} from '@dto';
import {
  UnauthorizedOrderAccessExecption,
  OrderNotFoundException,
  OrdersClusterNotFoundException,
} from '@exceptions';
import { randomUUID } from 'crypto';
import {
  GetProductsMetaDataMessage,
  GetProductsMetaDataMessageReply,
  GetAccountByIdMessage,
  GetAccountByIdMessageReply,
} from 'nest-dto';

@Injectable()
export class BuyerOrdersService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(SERVICES.ORDERS_SERVICE.token)
    private readonly eventsClient: ClientKafka,
  ) {}

  async getMyOrders(
    buyerId: string,
    input: GetBuyerOrdersInput,
  ): Promise<Order[]> {
    let filters = generateFiltersOfArgs(input, ['status']);

    const buyerOrdersCluster = await this.prisma.buyerOrdersCluster.findUnique({
      where: {
        buyerId,
      },
    });
    if (filters.length < 1) return buyerOrdersCluster.orders;
    const filteredOrders = buyerOrdersCluster.orders.filter((order) =>
      hasFilters(order, filters),
    );
    return filteredOrders;
  }

  async acceptRecievedOrder(
    buyerId: string,
    { orderId, shopId }: AcceptReceivedOrderInput,
  ): Promise<Order> {
    const [{ id: clusterId }, order] = await this.validateOrderOwnership(
      buyerId,
      orderId,
      shopId,
    );

    await this.prisma.sellerOrdersCluster.update({
      where: {
        id: clusterId,
      },
      data: {
        orders: {
          updateMany: {
            where: {
              id: orderId,
            },
            data: {
              status: {
                of: 'compeleted',
                rejectReason: null,
              },
            },
          },
        },
      },
    });
    await this.prisma.buyerOrdersCluster.update({
      where: {
        buyerId,
      },
      data: {
        orders: {
          updateMany: {
            where: {
              id: orderId,
            },
            data: {
              status: {
                of: 'compeleted',
                rejectReason: null,
              },
            },
          },
        },
      },
    });
    return order;
  }

  async rejectRecievedOrder(
    buyerId: string,
    { orderId, rejectReason, shopId }: RejectRecievedOrderInput,
  ): Promise<Order> {
    const [{ id }, order] = await this.validateOrderOwnership(
      buyerId,
      orderId,
      shopId,
    );

    await this.prisma.sellerOrdersCluster.update({
      where: {
        id,
      },
      data: {
        orders: {
          updateMany: {
            where: {
              id: order.id,
            },
            data: {
              status: {
                of: 'rejectedByBuyer',
                rejectReason,
              },
            },
          },
        },
      },
    });
    await this.prisma.buyerOrdersCluster.update({
      where: {
        buyerId,
      },
      data: {
        orders: {
          updateMany: {
            where: {
              id: order.id,
            },
            data: {
              status: {
                of: 'rejectedByBuyer',
                rejectReason,
              },
            },
          },
        },
      },
    });
    return order;
  }

  async validateOrderOwnership(
    ownerId: string,
    orderId: string,
    shopId: string,
  ): Promise<[SellerOrdersCluster, Order]> {
    const cluster = await this.prisma.sellerOrdersCluster.findUnique({
      where: {
        shopId,
      },

      rejectOnNotFound: (error) => {
        throw new OrdersClusterNotFoundException('id');
      },
    });
    const { orders, id: clusterId } = cluster;
    const order = orders.find((order) => order.id === orderId);
    if (!order) throw new OrderNotFoundException('id');
    const { buyerInfo, id, items, sellerInfo, status } = order;

    if (buyerInfo.id !== ownerId) throw new UnauthorizedOrderAccessExecption();
    return [cluster, order];
  }

  async createOrder(buyerId: string, input: placeOrderInput): Promise<Order> {
    const {
      results: { data, error, success },
    } = await KafkaMessageHandler<
      any,
      GetProductsMetaDataMessage,
      GetProductsMetaDataMessageReply
    >(
      this.eventsClient,
      KAFKA_MESSAGES.PRODUCTS_MESSAGES.getProductsMetaData,
      new GetProductsMetaDataMessage({
        productsIds: input.items.map((item) => item.itemId),
      }),
    );

    if (!success) throw error;
    const { ownerId: sellerId, productId, shopId } = data[0];

    const productsOfSameShop = data.every(
      (product) => product.shopId === shopId,
    );

    if (!productsOfSameShop)
      throw new BadRequestException(
        'failed to create order: order contains products from diffrent shops',
      );

    const { address, address2, city, country, state, postalCode, phone } =
      await this.getBuyerInfo(buyerId);

    const orderData: Order = {
      id: randomUUID(),
      status: {
        of: 'pending',
      },
      sellerInfo: {
        id: sellerId,
        shopId,
      },
      buyerInfo: {
        id: buyerId,
      },
      items: input.items,
    };

    await this.prisma.sellerOrdersCluster.upsert({
      where: {
        shopId,
      },
      create: {
        sellerId,
        shopId,
        orders: [orderData],
      },
      update: {
        orders: {
          push: orderData,
        },
      },
    });

    await this.prisma.buyerOrdersCluster.upsert({
      where: {
        buyerId,
      },
      create: {
        buyerId,
        orders: [orderData],
      },
      update: {
        orders: {
          push: orderData,
        },
      },
    });

    return orderData;
  }

  async getBuyerInfo(buyerId: string) {
    const {
      results: { data, error, success },
    } = await KafkaMessageHandler<
      any,
      GetAccountByIdMessage,
      GetAccountByIdMessageReply
    >(
      this.eventsClient,
      KAFKA_MESSAGES.ACCOUNTS_MESSAGES.getAccountById,
      new GetAccountByIdMessage({ accountId: buyerId }),
    );

    if (!success) throw error;

    return data;
  }
}
