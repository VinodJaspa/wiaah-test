import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { OrdersCluster } from '@prisma-client';
import { Filter, KAFKA_SERVICE_TOKEN } from 'nest-utils';
import { Order } from 'src/orders/entities/order.entity';
import { OrdersService } from 'src/orders/orders.service';
import { PrismaService } from 'src/prisma.service';
import { GetMyOrdersInput } from './dto/get-orders.input';
import { RejectOrderInput } from './dto/reject-order.input';
import { OrdersClusterNotFoundException } from './exceptions';
import { OrdersNotFoundException } from './exceptions/OrderNotFoundExceptio';

@Injectable()
export class SellerOrdersService {
  constructor(
    private readonly ordersService: OrdersService,
    @Inject(KAFKA_SERVICE_TOKEN) private readonly eventsClient: ClientKafka,
    private readonly prisma: PrismaService,
  ) {}

  async getFilteredOrders(
    sellerId: string,
    args: GetMyOrdersInput,
  ): Promise<Order[]> {
    const filters: Filter<Order>[] = [];

    if ('status' in args) filters.push(['status', args.status]);

    const ordersCluster = await this.prisma.ordersCluster.findUnique({
      where: {
        sellerId,
      },
      rejectOnNotFound(error) {
        throw new OrdersClusterNotFoundException('sellerId');
      },
    });

    if (filters.length < 1) return ordersCluster.orders;
    return ordersCluster.orders.filter((order) =>
      this.matchOrderFilters(order, filters),
    );
  }

  matchOrderFilters(order: Order, filters: Filter<Order>[]): boolean {
    return filters.every(([key, value]) => order[key] === value);
  }

  async rejectOrder(
    sellerId: string,
    { orderId, rejectReason }: RejectOrderInput,
  ): Promise<Order> {
    const [order, orderCluster] = await this.getOrder(sellerId, orderId);

    await this.prisma.ordersCluster.update({
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
  ): Promise<[Order, OrdersCluster]> {
    const orderCluster = await this.prisma.ordersCluster.findUnique({
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

    if (orderIdx < 0) throw new OrdersNotFoundException('id');

    const order = orderCluster.orders[orderIdx];
    return [order, orderCluster];
  }

  async acceptOrder(sellerId: string, orderId: string): Promise<Order> {
    const [order, orderCluster] = await this.getOrder(sellerId, orderId);
    this.prisma.ordersCluster.update({
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
    return order;
  }
}
