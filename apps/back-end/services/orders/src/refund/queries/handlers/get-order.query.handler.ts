import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { GetOrderQuery } from '@refund/queries/impl';
import { GetOrderByIdQuery } from '@orders/queries';
import { Order } from '@prisma-client';

export type OrderType = Order;

@QueryHandler(GetOrderQuery)
export class GetOrderQueryHandler implements IQueryHandler<GetOrderQuery> {
  constructor(private readonly querybus: QueryBus) {}

  async execute({ id }: GetOrderQuery): Promise<Order> {
    const order = await this.querybus.execute(new GetOrderByIdQuery(id));
    if (!order) return null;
    return order;
  }
}
