import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { StoryCommandHandlers } from './command';
import { StoryQueryHandlers } from './queries';
import { StoryRepository } from './repository';
import { StoryResolver } from './story.resolver';

@Module({
  imports: [CqrsModule],
  providers: [
    StoryResolver,
    StoryRepository,
    ...StoryCommandHandlers,
    ...StoryQueryHandlers,
  ],
})
export class StoryModule {}
