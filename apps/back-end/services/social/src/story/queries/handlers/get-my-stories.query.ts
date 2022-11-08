import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { StoryRepository } from '../../repository';
import { Story } from '../../entities';
import { GetMyStoriesQuery } from '../impl';

@QueryHandler(GetMyStoriesQuery)
export class GetMyStoriesQueryHandler
  implements IQueryHandler<GetMyStoriesQuery>
{
  constructor(private readonly storyRepo: StoryRepository) {}

  async execute({ user }: GetMyStoriesQuery): Promise<Story[]> {
    const stories = await this.storyRepo.getUserStories(user.id);
    return stories;
  }
}
