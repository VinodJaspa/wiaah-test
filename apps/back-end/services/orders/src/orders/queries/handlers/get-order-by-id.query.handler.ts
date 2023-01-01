import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OrdersRepository } from '@orders/repositoy';
import { Order } from '@prisma-client';
import { GetOrderByIdQuery } from '../impl/get-order-by-id.query';

@QueryHandler(GetOrderByIdQuery)
export class GetOrderByIdQueryHandler
  implements IQueryHandler<GetOrderByIdQuery>
{
  constructor(private readonly repo: OrdersRepository) {}

  execute(query: GetOrderByIdQuery): Promise<Order> {
    return this.repo.getOrderById(query.id);
  }
}
