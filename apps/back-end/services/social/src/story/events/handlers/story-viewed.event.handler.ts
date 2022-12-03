import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdateUserFollowerStoryLastSeenAtCommand } from '../../command';
import { StoryRepository } from '../../repository';
import { StoryViewedEvent } from '../impl';

@EventsHandler(StoryViewedEvent)
export class StoryViewedEventHandler
  implements IEventHandler<StoryViewedEvent>
{
  constructor(
    private storyRepo: StoryRepository,
    private readonly commandBus: CommandBus,
  ) {}
  handle({ story, user }: StoryViewedEvent) {
    this.storyRepo.incrementStoryViews(story.id, user.id);

    this.commandBus.execute<UpdateUserFollowerStoryLastSeenAtCommand>(
      new UpdateUserFollowerStoryLastSeenAtCommand(story, user),
    );
  }
}
