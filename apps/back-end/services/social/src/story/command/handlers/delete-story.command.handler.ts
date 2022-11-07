import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { StoryDeletedEvent } from '../../events';
import { Story } from '../../entities';
import { StoryRepository } from '../../repository';
import { DeleteStoryCommand } from '../impl';

@CommandHandler(DeleteStoryCommand)
export class DeleteStoryCommandHandler
  implements ICommandHandler<DeleteStoryCommand>
{
  constructor(
    private readonly storyRepo: StoryRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute({ input, user }: DeleteStoryCommand): Promise<Story> {
    const story = await this.storyRepo.DeleteStory(input.storyId, user.id);
    this.eventBus.publish(new StoryDeletedEvent(story, user));
    return story;
  }
}
