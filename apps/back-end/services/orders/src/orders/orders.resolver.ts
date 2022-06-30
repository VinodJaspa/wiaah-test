import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Inject, OnModuleInit } from '@nestjs/common';
import { KAFKA_SERVICE_TOKEN } from 'nest-utils';
import { ClientKafka } from '@nestjs/microservices';

@Resolver(() => Order)
export class OrdersResolver implements OnModuleInit {
  constructor(
    private readonly ordersService: OrdersService,
    @Inject(KAFKA_SERVICE_TOKEN) private readonly eventsClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.eventsClient.connect();
  }
}
