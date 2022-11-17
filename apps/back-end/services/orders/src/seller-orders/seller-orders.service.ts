import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { SellerOrdersCluster } from '@prisma-client';
import { generateFiltersOfArgs, hasFilters, SERVICES } from 'nest-utils';
import { Order } from '@entities';
import { OrdersService } from '../orders/orders.service';
import { PrismaService } from 'prismaService';
import { GetMyOrdersInput, RejectOrderRequestInput } from '@dto';
import {
  OrdersClusterNotFoundException,
  OrderNotFoundException,
} from '@exceptions';

@Injectable()
export class SellerOrdersService {
  constructor(
    private readonly ordersService: OrdersService,
    @Inject(SERVICES.ORDERS_SERVICE.token)
    private readonly eventsClient: ClientKafka,
    private readonly prisma: PrismaService,
  ) {}

  async getMyOrders(
    sellerId: string,
    args: GetMyOrdersInput,
  ): Promise<Order[]> {
    const filters = generateFiltersOfArgs(args, ['status']);

    const ordersCluster = await this.prisma.sellerOrdersCluster.findUnique({
      where: {
        sellerId,
      },
      rejectOnNotFound(error) {
        throw new OrdersClusterNotFoundException('sellerId');
      },
    });

    if (filters.length < 1) return ordersCluster.orders;
    return ordersCluster.orders.filter((order) => hasFilters(order, filters));
  }

  async rejectOrder(
    sellerId: string,
    { orderId, rejectReason }: RejectOrderRequestInput,
  ): Promise<Order> {
    const [order, orderCluster] = await this.getOrder(sellerId, orderId);

    await this.prisma.sellerOrdersCluster.update({
      where: {
        id: orderCluster.id,
      },
      data: {
        orders: {
          updateMany: {
            where: {
              id: orderId,
            },
            data: {
              status: {
                of: 'rejectedBySeller',
                rejectReason,
              },
            },
          },
        },
      },
    });

    return order;
  }

  async getOrder(
    sellerId: string,
    orderId: string,
  ): Promise<[Order, SellerOrdersCluster]> {
    const orderCluster = await this.prisma.sellerOrdersCluster.findUnique({
      where: {
        sellerId,
      },
      rejectOnNotFound: (error) => {
        throw new OrdersClusterNotFoundException('sellerId');
      },
    });

    const orderIdx = orderCluster.orders.findIndex(
      (order) => order.id === orderId,
    );

    if (orderIdx < 0) throw new OrderNotFoundException('id');

    const order = orderCluster.orders[orderIdx];
    return [order, orderCluster];
  }

  async acceptOrderRequest(sellerId: string, orderId: string): Promise<Order> {
    const [order, orderCluster] = await this.getOrder(sellerId, orderId);
    await this.prisma.sellerOrdersCluster.update({
      where: {
        id: orderCluster.id,
      },
      data: {
        orders: {
          updateMany: {
            where: {
              id: orderId,
            },
            data: {
              status: {
                of: 'shipping',
              },
            },
          },
        },
      },
    });
    await this.prisma.buyerOrdersCluster.update({
      where: {
        buyerId: order.buyerInfo.id,
      },
      data: {
        orders: {
          updateMany: {
            where: {
              id: orderId,
            },
            data: {
              status: {
                of: 'shipping',
              },
            },
          },
        },
      },
    });
    return order;
  }
}
