import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateActionCommand } from '@action/commands/impl';
import { ActionRepository } from '@action/repository';
import { Action } from '@action/entities';
import { ActionCreatedEvent } from '@action/events';

@CommandHandler(CreateActionCommand)
export class CreateActionCommandHandler
  implements ICommandHandler<CreateActionCommand>
{
  constructor(
    private readonly repo: ActionRepository,
    private readonly eventbus: EventBus,
  ) {}

  async execute({ input, userId }: CreateActionCommand): Promise<Action> {
    const link = input.link;

    if (link) {
      // todo: check if link is a wiaah limk
    }

    const res = await this.repo.create({
      ...input,
      userId,
      cover: input.actionCoverSrc,
      src: input.actionSrc,
    });
    this.eventbus.publish(new ActionCreatedEvent(res));
    return res;
  }
}
