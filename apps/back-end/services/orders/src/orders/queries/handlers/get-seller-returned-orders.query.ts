import { Order } from '@entities';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSellerReturnedOrdersQuery } from '@orders/queries/impl';
import { OrdersRepository } from '@orders/repositoy';

@QueryHandler(GetSellerReturnedOrdersQuery)
export class GetSellerReturnedOrdersQueryHandler
  implements IQueryHandler<GetSellerReturnedOrdersQuery>
{
  constructor(private readonly repo: OrdersRepository) {}

  async execute({ sellerId }: GetSellerReturnedOrdersQuery): Promise<Order[]> {
    const res = await this.repo.getAllBySellerId(sellerId, 'rejectedByBuyer');
    return res;
  }
}
