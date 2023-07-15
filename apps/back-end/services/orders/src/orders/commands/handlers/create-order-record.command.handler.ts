import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { CreateOrderCommand } from '@orders/commands/impl';
import { Order } from '@orders/entities';
import { OrdersRepository } from '@orders/repositoy';
import { OrderCreatedEvent } from 'nest-dto';
import { KAFKA_EVENTS, SERVICES } from 'nest-utils';

@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler
  implements ICommandHandler<CreateOrderCommand>
{
  constructor(
    private readonly repo: OrdersRepository,
    @Inject(SERVICES.ORDERS_SERVICE.token)
    private readonly eventclient: ClientKafka,
  ) {}

  async execute({
    buyerId,
    orderItems,
    sellerId,
    shippingMethodId,
    shippingAddressId,
  }: CreateOrderCommand): Promise<Order> {
    const res = await this.repo.create(
      buyerId,
      sellerId,
      orderItems,
      shippingMethodId,
      shippingAddressId,
    );

    return { ...res };
  }
}
