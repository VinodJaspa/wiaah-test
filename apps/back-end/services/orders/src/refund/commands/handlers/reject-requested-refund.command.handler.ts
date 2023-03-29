import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { RejectRequestedRefundCommand } from '@refund/commands/impl';
import { Refund } from '@refund/entities';
import { RefundRepository } from '@refund/repository';
import { RefundCommandHandlersBase } from '@refund/commands/abstractions';
import { RefundStatusType } from '@prisma-client';

@CommandHandler(RejectRequestedRefundCommand)
export class RejectRequestedRefundCommandHandler
  extends RefundCommandHandlersBase
  implements ICommandHandler<RejectRequestedRefundCommand>
{
  constructor(private readonly repo: RefundRepository, querybus: QueryBus) {
    super(querybus);
  }

  async execute({
    input: { id, reason },
    userId,
  }: RejectRequestedRefundCommand): Promise<Refund> {
    await this.validateCanModifyRequest(id, userId);
    const res = await this.repo.updateOneStatus(
      id,
      RefundStatusType.rejected,
      reason,
    );

    return res;
  }
}
