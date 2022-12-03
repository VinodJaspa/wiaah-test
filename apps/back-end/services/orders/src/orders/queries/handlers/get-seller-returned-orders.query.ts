import { Order } from '@orders/entities';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSellerReturnedOrdersQuery } from '@orders/queries/impl';
import { OrdersRepository } from '@orders/repositoy';
import { AddToDate } from 'nest-utils';
import { MAX_DAYS_REFUND } from '@orders/const';

@QueryHandler(GetSellerReturnedOrdersQuery)
export class GetSellerReturnedOrdersQueryHandler
  implements IQueryHandler<GetSellerReturnedOrdersQuery>
{
  constructor(private readonly repo: OrdersRepository) {}

  async execute({ sellerId }: GetSellerReturnedOrdersQuery): Promise<Order[]> {
    const res = await this.repo.getAllBySellerId(sellerId, 'rejectedByBuyer');
    return res.map((v) => ({
      ...v,
      refundable:
        AddToDate(v.completedAt, { days: MAX_DAYS_REFUND }) < new Date(),
    }));
  }
}
