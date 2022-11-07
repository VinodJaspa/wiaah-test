import { EventBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { StoryRepository } from '../../repository';
import { Story } from '../../entities';
import { ViewUserStoryQuery } from '../impl';
import { StoryViewedEvent } from '../../events';

@QueryHandler(ViewUserStoryQuery)
export class ViewUserStoryQueryHandler
  implements IQueryHandler<ViewUserStoryQuery>
{
  constructor(
    private readonly storyRepo: StoryRepository,
    private readonly eventbus: EventBus,
  ) {}

  async execute({ user, userId }: ViewUserStoryQuery): Promise<Story> {
    const story = await this.storyRepo.viewUserStories(userId, user.id);
    this.eventbus.publish<StoryViewedEvent>(new StoryViewedEvent(story, user));
    return story;
  }
}
