import { OrdersCluster } from '@entities';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrdersClusterService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrderCluster(sellerId: string, shopId: string) {
    return this.prisma.ordersCluster.create({
      data: {
        shopId,
        sellerId,
      },
    });
  }

  getClusterById(id: string): Promise<OrdersCluster> {
    return this.prisma.ordersCluster.findUnique({
      where: {
        id,
      },
    });
  }
}
