import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetRefundRequestQuery } from '@refund/queries';

export class RefundCommandHandlersBase {
  querybus: QueryBus;
  constructor(querybus: QueryBus) {
    this.querybus = querybus;
  }

  async validateCanModifyRequest(requestId: string, userId: string) {
    const request = await this.querybus.execute(
      new GetRefundRequestQuery(requestId, userId),
    );

    if (!request) throw new NotFoundException('refund request not found');

    if (request.sellerId !== userId)
      throw new UnauthorizedException(
        'you can only accept refund requests on your orders',
      );
  }
}
