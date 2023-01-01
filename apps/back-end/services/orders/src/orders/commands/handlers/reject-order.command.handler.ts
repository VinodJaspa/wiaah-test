import { UnauthorizedException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { RejectOrderCommand } from '@orders/commands/impl';
import { OrderCanceledEvent } from '@orders/events';
import { OrderNotFoundException } from '@orders/exceptions';
import { OrdersRepository } from '@orders/repositoy';

@CommandHandler(RejectOrderCommand)
export class RejectOrderCommandHandler
  implements ICommandHandler<RejectOrderCommand>
{
  constructor(
    private readonly repo: OrdersRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute({
    orderId,
    userId,
    reason,
  }: RejectOrderCommand): Promise<boolean> {
    const order = await this.repo.getOrderById(orderId);
    if (!order) throw new OrderNotFoundException();
    if (order.sellerId !== userId) throw new UnauthorizedException();

    await this.repo.rejectOrderBySeller(orderId, reason);
    this.eventBus.publish(new OrderCanceledEvent(order));
    return true;
  }
}
