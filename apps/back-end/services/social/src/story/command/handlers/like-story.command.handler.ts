import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { StoryLikedEvent } from '../../events';
import { StoryRepository } from '../../repository';
import { LikeStoryCommand } from '../impl';

@CommandHandler(LikeStoryCommand)
export class LikeStoryCommandHandler
  implements ICommandHandler<LikeStoryCommand>
{
  constructor(
    private readonly storyRepo: StoryRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute({ input, user }: LikeStoryCommand): Promise<true> {
    const story = await this.storyRepo.likeStory(input, user.id);
    this.eventBus.publish<StoryLikedEvent>(new StoryLikedEvent(story, user));
    return true;
  }
}
