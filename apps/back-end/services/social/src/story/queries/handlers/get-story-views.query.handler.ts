import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { StoryView } from '../../entities';
import { StoryRepository } from '../../repository';
import { GetStoryViewsQuery } from '../impl';

@QueryHandler(GetStoryViewsQuery)
export class GetStoryViewsQueryHandler
  implements IQueryHandler<GetStoryViewsQuery>
{
  constructor(private readonly storyRepo: StoryRepository) {}

  async execute({ input, user }: GetStoryViewsQuery): Promise<StoryView[]> {
    const views = await this.storyRepo.getSeenBy(input, user.id);
    return views;
  }
}
