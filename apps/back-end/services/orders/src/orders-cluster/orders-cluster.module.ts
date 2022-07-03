import { Module } from '@nestjs/common';
import { OrdersClusterService } from './orders-cluster.service';
import { OrdersClusterResolver } from './orders-cluster.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [OrdersClusterResolver, OrdersClusterService, PrismaService],
})
export class OrdersClusterModule {}
