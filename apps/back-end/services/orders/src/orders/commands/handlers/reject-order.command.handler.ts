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
  }: RejectOrderCommand): Promise<Order> {
    const order = await this.repo.getOrderById(orderId);
    if (!order) throw new OrderNotFoundException();
    if (order.sellerId === userId)
      return this.repo.rejectOrderBySeller(orderId, reason);
    if (order.buyerId === userId)
      return this.repo.rejectOrderByBuyer(orderId, reason);
    throw new UnauthorizedException();
  }
}
