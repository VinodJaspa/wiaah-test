import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MAX_DAYS_REFUND } from '@orders/const';
import { Order } from '@orders/entities';
import { GetSellerOrdersQuery } from '@orders/queries/impl';
import { OrdersRepository } from '@orders/repositoy';
import { AddToDate } from 'nest-utils';

@QueryHandler(GetSellerOrdersQuery)
export class GetSellerOrdersQueryHandler
  implements IQueryHandler<GetSellerOrdersQuery>
{
  constructor(private readonly repo: OrdersRepository) {}

  async execute({
    sellerId,
    statusFilter,
    q,
    pagination,
  }: GetSellerOrdersQuery): Promise<Order[]> {
    const res = await this.repo.getAllBySellerId(
      sellerId,
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
