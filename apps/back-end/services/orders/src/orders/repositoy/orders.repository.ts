import { Injectable } from '@nestjs/common';
import { OrderStatus } from '@orders/const';
import { Order, OrderStatusEnum, Prisma } from '@prisma-client';
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
    items: { qty: number; type: string; productId: string }[],
    shippingMethodId: string,
    shippingAddressId: string,
  ) {
    return this.prisma.order.create({
      data: {
        shippingAddressId,
        shippingMethodId,
        buyerId,
        sellerId,
        items: {
          createMany: {
            data: items,
          },
        },
        status: {
          of: 'pending',
        },
      },
      include: {
        items: true,
      },
    });
  }

  getAllByBuyerId(
    buyerId: string,
    status?: OrderStatusEnum,
    pagination?: PaginationDataInput,
    q?: string,
  ) {
    const { skip, take } = ExtractPagination(pagination);

    const queryFilters: Prisma.OrderWhereInput[] = [];

    if (q) {
      queryFilters.push({
        id: {
          contains: q,
        },
      });
      queryFilters.push({
        buyerId: {
          contains: q,
        },
      });
      queryFilters.push({
        sellerId: {
          contains: q,
        },
      });

      queryFilters.push({
        items: {
          some: {
            id: {
              contains: q,
            },
          },
        },
      });
    }

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
          {
            OR: queryFilters,
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take,
      include: {
        items: true,
      },
    });
  }

  getAllBySellerId(
    sellerId: string,
    status?: OrderStatusEnum,
    pagination?: GqlPaginationInput,
    q?: string,
  ) {
    const { skip, take } = ExtractPagination(pagination);
    const queryFilters: Prisma.OrderWhereInput[] = [];

    if (q) {
      queryFilters.push({
        id: {
          contains: q,
        },
      });
      queryFilters.push({
        buyerId: {
          contains: q,
        },
      });
      queryFilters.push({
        sellerId: {
          contains: q,
        },
      });

      queryFilters.push({
        items: {
          some: {
            id: {
              contains: q,
            },
          },
        },
      });
    }

    return this.prisma.order.findMany({
      where: {
        AND: [
          { sellerId },
          {
            status: {
              of: status,
            },
          },
          {
            OR: queryFilters,
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
      take,
      skip,
      include: {
        items: true,
      },
    });
  }

  getOrderById(id: string) {
    return this.prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        items: true,
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
        completedAt: new Date(),
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
      include: {
        items: true,
      },
    });
  }
}
