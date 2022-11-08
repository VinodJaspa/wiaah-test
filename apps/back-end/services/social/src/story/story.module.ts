import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { StoryCommandHandlers } from './command';
import { storyEventHandlers } from './events';
import { StoryQueryHandlers } from './queries';
import { RecentStoryResolver } from './recent-story.resolver';
import { StoryRepository } from './repository';
import { StoryViewResolver } from './story-view.resolver';
import { StoryResolver } from './story.resolver';

@Module({
  imports: [CqrsModule],
  providers: [
    StoryResolver,
    StoryViewResolver,
    RecentStoryResolver,
    StoryRepository,
    ...StoryCommandHandlers,
    ...StoryQueryHandlers,
    ...storyEventHandlers,
  ],
})
export class StoryModule {}
