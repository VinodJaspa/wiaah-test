import {
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { RejectReceivedOrderCommand } from '@orders/commands/impl';
import { Order } from '@orders/entities';
import { OrderCanceledEvent } from '@orders/events';
import { GetIsOrderBuyerQuery } from '@orders/queries';
import { OrdersRepository } from '@orders/repositoy';

@CommandHandler(RejectReceivedOrderCommand)
export class RejectRecivedOrderCommandHandler
  implements ICommandHandler<RejectReceivedOrderCommand>
{
  constructor(
    private readonly repo: OrdersRepository,
    private readonly querybus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}
  async execute({
    input,
    userId,
  }: RejectReceivedOrderCommand): Promise<boolean> {
    const [isBuyer, order] = await this.querybus.execute<
      GetIsOrderBuyerQuery,
      [boolean, Order]
    >(new GetIsOrderBuyerQuery(input.id, userId, true));

    if (!isBuyer) throw new UnauthorizedException();

    if (order && order.status.of === 'pending')
      throw new UnprocessableEntityException();

    const res = await this.repo.rejectOrderByBuyer(
      input.id,
      input.rejectReason,
    );
    this.eventBus.publish(new OrderCanceledEvent(res));
    return true;
  }
}
