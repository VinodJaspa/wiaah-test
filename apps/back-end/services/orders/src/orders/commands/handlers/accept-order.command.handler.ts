import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AcceptOrderCommand } from '@orders/commands/impl';
import { Order } from '@orders/entities';
import { OrderNotFoundException } from '@orders/exceptions';
import { OrdersRepository } from '@orders/repositoy';

@CommandHandler(AcceptOrderCommand)
export class AcceptOrderCommandHandler
  implements ICommandHandler<AcceptOrderCommand>
{
  constructor(private readonly repo: OrdersRepository) {}

  async execute({ orderId, userId }: AcceptOrderCommand): Promise<Order> {
    const order = await this.repo.getOrderById(orderId);
    if (!order) throw new OrderNotFoundException();
    if (order.sellerId !== userId)
      throw new UnauthorizedException(
        'you cannot preform this action on this order',
      );
    const accepted = await this.repo.acceptOrder(orderId);
    return accepted;
  }
}
