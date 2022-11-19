import { Injectable } from '@nestjs/common';
import { OrderStatus } from '@orders/const';
import { Order, OrderStatusEnum } from '@prisma-client';
import {
  ExtractPagination,
  GqlPaginationInput,
  PaginationDataInput,
} from 'nest-utils';
import { PrismaService } from 'prismaService';

@Injectable()
export class OrdersRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(
    buyerId: string,
    sellerId: string,
    items: { id: string; qty: number; type: string }[],
    shippingMethodId: string,
  ): Promise<Order> {
    return this.prisma.order.create({
      data: {
        shippingMethodId,
        buyerId,
        sellerId,
        items,
        status: {
          of: 'pending',
        },
      },
    });
  }

  getAllByBuyerId(
    buyerId: string,
    status?: OrderStatusEnum,
    pagination?: PaginationDataInput,
  ): Promise<Order[]> {
    const { skip, take } = ExtractPagination(pagination);
    return this.prisma.order.findMany({
      where: {
        AND: [
          {
            buyerId,
          },
          {
            status: {
              of: status,
            },
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take,
    });
  }

  getAllBySellerId(
    sellerId: string,
    status?: OrderStatusEnum,
    pagination?: GqlPaginationInput,
  ): Promise<Order[]> {
    const { skip, take } = ExtractPagination(pagination);
    return this.prisma.order.findMany({
      where: {
        AND: [
          { sellerId },
          {
            status: {
              of: status,
            },
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
      take,
      skip,
    });
  }

  getOrderById(id: string): Promise<Order> {
    return this.prisma.order.findUnique({
      where: {
        id,
      },
    });
  }

  acceptRequestedOrder(orderId: string) {
    return this.prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: {
          of: OrderStatus.shipping,
        },
      },
    });
  }

  acceptReceivedOrder(orderId: string) {
    return this.prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: {
          of: OrderStatus.compeleted,
        },
      },
    });
  }

  rejectOrderBySeller(orderId: string, reason?: string) {
    return this.prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: {
          of: OrderStatus.rejectedBySeller,
          rejectReason: reason,
        },
      },
    });
  }

  rejectOrderByBuyer(orderId: string, reason?: string) {
    return this.prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: {
          of: OrderStatus.rejectedByBuyer,
          rejectReason: reason,
        },
      },
    });
  }
}
