import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Refund } from '@refund/entities';
import { GetRefundRequestQuery } from '@refund/queries/impl';
import { RefundRepository } from '@refund/repository';

@QueryHandler(GetRefundRequestQuery)
export class GetRefundRequestQueryHandler
  implements IQueryHandler<GetRefundRequestQuery>
{
  constructor(private readonly repo: RefundRepository) {}

  async execute({ id, userId }: GetRefundRequestQuery): Promise<Refund> {
    const res = await this.repo.getOneById(id);
    return res;
  }
}
