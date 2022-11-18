import { EventBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Order } from '@orders/entities';
import { GetBuyerOrdersQuery } from '@orders/queries/impl';
import { OrdersRepository } from '@orders/repositoy';

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
  }: GetBuyerOrdersQuery): Promise<Order[]> {
    const res = await this.repo.getAllByBuyerId(buyerId, statusFilter);
    return res;
  }
}
