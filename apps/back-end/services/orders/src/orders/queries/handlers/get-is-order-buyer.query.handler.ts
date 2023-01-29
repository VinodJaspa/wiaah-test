import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OrdersRepository } from '@orders/repositoy';
import { GetIsOrderBuyerQuery } from '@orders/queries/impl';
import { OrderNotFoundException } from '@orders/exceptions';
import { Order } from '@orders/entities';
import { AddToDate } from 'nest-utils';
import { MAX_DAYS_REFUND } from '@orders/const';

@QueryHandler(GetIsOrderBuyerQuery)
export class GetIsOrderBuyerQueryHandler
  implements IQueryHandler<GetIsOrderBuyerQuery>
{
  constructor(private readonly repo: OrdersRepository) {}

  async execute({
    orderId,
    userId,
    getOrder,
  }: GetIsOrderBuyerQuery): Promise<[boolean, Order] | [boolean]> {
    let res = await this.repo.getOrderById(orderId);
    if (!res) throw new OrderNotFoundException();
    const isBuyer = res.buyerId === userId;
    return getOrder
      ? [
          isBuyer,
          {
            ...res,
          },
        ]
      : [isBuyer];
  }
}
