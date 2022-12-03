import { UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RejectOrderCommand } from '@orders/commands/impl';
import { Order } from '@orders/entities';
import { OrderNotFoundException } from '@orders/exceptions';
import { OrdersRepository } from '@orders/repositoy';

@CommandHandler(RejectOrderCommand)
export class RejectOrderCommandHandler
  implements ICommandHandler<RejectOrderCommand>
{
  constructor(private readonly repo: OrdersRepository) {}

  async execute({
    orderId,
    userId,
    reason,
  }: RejectOrderCommand): Promise<boolean> {
    const order = await this.repo.getOrderById(orderId);
    if (!order) throw new OrderNotFoundException();
    if (order.sellerId !== userId) throw new UnauthorizedException();

    await this.repo.rejectOrderBySeller(orderId, reason);
    return true;
  }
}
