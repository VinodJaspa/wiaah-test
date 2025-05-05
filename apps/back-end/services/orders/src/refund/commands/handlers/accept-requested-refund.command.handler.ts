import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { AcceptRequestedRefundCommand } from '@refund/commands/impl';
import { OrderRefundStatusEnum } from '@refund/const';
import { Refund } from '@refund/entities';
import { RefundRepository } from '@refund/repository';
import { RefundCommandHandlersBase } from '@refund/commands/abstractions';
import { RefundStatusType } from '@prisma-client';

@CommandHandler(AcceptRequestedRefundCommand)
export class AcceptRequestedRefundCommandHandler
  extends RefundCommandHandlersBase
  implements ICommandHandler<AcceptRequestedRefundCommand>
{
  constructor(
    private readonly repo: RefundRepository,
    querybus: QueryBus,
  ) {
    super(querybus);
  }

  async execute({
    requestId,
    userId,
  }: AcceptRequestedRefundCommand): Promise<Refund> {
    await this.validateCanModifyRequest(requestId, userId);
    const res = await this.repo.updateOneStatus(
      requestId,
      RefundStatusType.accepted,
    );

    return res;
  }
}
