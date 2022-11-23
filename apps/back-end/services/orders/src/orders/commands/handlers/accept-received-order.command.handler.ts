import {
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { AcceptReceivedOrderCommand } from '@orders/commands/impl';
import { Order } from '@orders/entities';
import { GetIsOrderBuyerQuery } from '@orders/queries';
import { OrdersRepository } from '@orders/repositoy';

@CommandHandler(AcceptReceivedOrderCommand)
export class AcceptReceivedOrderCommandHandler
  implements ICommandHandler<AcceptReceivedOrderCommand>
{
  constructor(
    private readonly repo: OrdersRepository,
    private readonly querybus: QueryBus,
  ) {}

  async execute({
    orderId,
    userId,
  }: AcceptReceivedOrderCommand): Promise<boolean> {
    const [isbuyer, order] = await this.querybus.execute<
      GetIsOrderBuyerQuery,
      [boolean, Order]
    >(new GetIsOrderBuyerQuery(orderId, userId, true));
    if (!isbuyer) throw new UnauthorizedException();
    if (order.status.of !== 'shipping')
      throw new UnprocessableEntityException();

    await this.repo.acceptReceivedOrder(orderId);
    return true;
  }
}
