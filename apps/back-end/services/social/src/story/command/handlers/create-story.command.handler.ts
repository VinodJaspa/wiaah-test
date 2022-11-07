import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { StoryRepository } from '../../repository';
import { Story } from '../../entities';
import { CreateStoryCommand } from '../impl';
import { StoryCreatedEvent } from '../../events';

@CommandHandler(CreateStoryCommand)
export class CreateStoryCommandHandler
  implements ICommandHandler<CreateStoryCommand>
{
  constructor(
    private readonly StoryRepo: StoryRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute({ input, user }: CreateStoryCommand): Promise<Story> {
    const story = await this.StoryRepo.create(input, user.id);
    this.eventBus.publish<StoryCreatedEvent>(
      new StoryCreatedEvent(story, user),
    );
    return story;
  }
}
