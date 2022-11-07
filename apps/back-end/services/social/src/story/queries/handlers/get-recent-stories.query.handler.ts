import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { RecentStory } from '../../entities';
import { StoryRepository } from '../../repository';
import { GetRecentStoriesQuery } from '../impl';

@QueryHandler(GetRecentStoriesQuery)
export class GetRecentStoriesQueryHandler
  implements IQueryHandler<GetRecentStoriesQuery>
{
  constructor(private readonly storyRepo: StoryRepository) {}

  async execute({
    input,
    user,
  }: GetRecentStoriesQuery): Promise<RecentStory[]> {
    return this.storyRepo.getRecentStories(input, user?.id);
  }
}
