import { HiddenContent } from '@hidden-content/entities';
import { ContentHiddenEvent } from '@hidden-content/events';
import { HiddenContentRepository } from '@hidden-content/repository';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { HideContentCommand } from '../impl';

@CommandHandler(HideContentCommand)
export class HideContentCommandHandler
  implements ICommandHandler<HideContentCommand>
{
  constructor(
    private readonly repo: HiddenContentRepository,
    private readonly eventbus: EventBus,
  ) {}

  async execute({
    input: { id },
    userId,
  }: HideContentCommand): Promise<HiddenContent> {
    const res = await this.repo.create(id, userId);
    this.eventbus.publish(new ContentHiddenEvent(res.id, res.userId));
    return res;
  }
}
