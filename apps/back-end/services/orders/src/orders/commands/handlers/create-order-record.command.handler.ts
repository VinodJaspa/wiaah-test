import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from '@orders/commands/impl';
import { Order } from '@orders/entities';
import { OrderCreatedEvent } from '@orders/events';
import { OrdersRepository } from '@orders/repositoy';

@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler
  implements ICommandHandler<CreateOrderCommand>
{
  constructor(
    private readonly repo: OrdersRepository,
    private readonly eventbus: EventBus,
  ) {}

  async execute({
    buyerId,
    orderItems,
    sellerId,
  }: CreateOrderCommand): Promise<Order> {
    const res = await this.repo.create(buyerId, sellerId, orderItems);

    this.eventbus.publish(new OrderCreatedEvent(res));

    return res;
  }
}
