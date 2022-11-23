import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Order } from '@orders/entities';
import { GetSellerOrdersQuery } from '@orders/queries/impl';
import { OrdersRepository } from '@orders/repositoy';

@QueryHandler(GetSellerOrdersQuery)
export class GetSellerOrdersQueryHandler
  implements IQueryHandler<GetSellerOrdersQuery>
{
  constructor(private readonly repo: OrdersRepository) {}

  async execute({
    sellerId,
    statusFilter,
  }: GetSellerOrdersQuery): Promise<Order[]> {
    const res = await this.repo.getAllBySellerId(sellerId, statusFilter);
    return res;
  }
}
