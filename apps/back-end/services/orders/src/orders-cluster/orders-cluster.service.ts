import { OrdersCluster } from '@entities';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prismaService';

@Injectable()
export class OrdersClusterService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrderCluster(sellerId: string, shopId: string) {
    return this.prisma.sellerOrdersCluster.create({
      data: {
        shopId,
        sellerId,
      },
    });
  }

  getClusterById(id: string): Promise<OrdersCluster> {
    return this.prisma.sellerOrdersCluster.findUnique({
      where: {
        id,
      },
    });
  }
}
