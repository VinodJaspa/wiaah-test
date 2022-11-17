import { Module } from '@nestjs/common';
import { OrdersClusterService } from './orders-cluster.service';
import { OrdersClusterResolver } from './orders-cluster.resolver';
import { PrismaService } from 'prismaService';
import { OrdersClusterController } from './orders-cluster.controller';

@Module({
  providers: [OrdersClusterResolver, OrdersClusterService, PrismaService],
  controllers: [OrdersClusterController],
})
export class OrdersClusterModule {}
