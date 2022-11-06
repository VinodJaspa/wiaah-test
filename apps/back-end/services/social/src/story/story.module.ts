import { Module } from '@nestjs/common';

import { StoryResolver } from './story.resolver';

@Module({
  providers: [StoryResolver],
})
export class StoryModule {}
