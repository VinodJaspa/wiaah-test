import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateRefundRequestCommand } from '@refund/commands/impl';
import { Refund } from '@refund/entities';
import { RefundRequestCreatedEvent } from '@refund/events';
import { RefundRepository } from '@refund/repository';
import { DBErrorException } from 'nest-utils';

@CommandHandler(CreateRefundRequestCommand)
export class CreateRefundRequestCommandHandler
  implements ICommandHandler<CreateRefundRequestCommand>
{
  constructor(
    private readonly repo: RefundRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute({
    input,
    userId,
  }: CreateRefundRequestCommand): Promise<Refund> {
    try {
      const res = await this.repo.createOne(input, userId);
      this.eventBus.publish(new RefundRequestCreatedEvent(res));
      return res;
    } catch (error) {
      console.error(error);
      throw new DBErrorException('');
    }
  }
}
