import { EventBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MAX_DAYS_REFUND } from '@orders/const';
import { Order } from '@orders/entities';
import { GetBuyerOrdersQuery } from '@orders/queries/impl';
import { OrdersRepository } from '@orders/repositoy';
import { AddToDate } from 'nest-utils';

@QueryHandler(GetBuyerOrdersQuery)
export class GetBuyerOrdersQueryHandler
  implements IQueryHandler<GetBuyerOrdersQuery>
{
  constructor(
    private readonly repo: OrdersRepository,
    private readonly eventbus: EventBus,
  ) {}

  async execute({
    buyerId,
    statusFilter,
    pagination,
    q,
  }: GetBuyerOrdersQuery): Promise<Order[]> {
    const res = await this.repo.getAllByBuyerId(
      buyerId,
      statusFilter,
      pagination,
      q,
    );
    return res.map((v) => ({
      ...v,
      refundable:
        AddToDate(v.completedAt, { days: MAX_DAYS_REFUND }) < new Date(),
    }));
  }
}
