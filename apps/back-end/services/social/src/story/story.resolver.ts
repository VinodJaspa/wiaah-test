import { Resolver } from '@nestjs/graphql';

import { Story } from './entities/story.entity';

@Resolver(() => Story)
export class StoryResolver {
  constructor() {}
}
