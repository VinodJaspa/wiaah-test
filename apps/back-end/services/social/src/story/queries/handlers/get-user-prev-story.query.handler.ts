import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { StoryRepository } from '../../repository';
import { Story } from '../../entities';
import { GetUserPrevStoryQuery } from '../impl';

@QueryHandler(GetUserPrevStoryQuery)
export class GetUserPrevStoryQueryHandler
  implements IQueryHandler<GetUserPrevStoryQuery>
{
  constructor(private readonly storyRepo: StoryRepository) {}

  async execute({ storyId, user }: GetUserPrevStoryQuery): Promise<Story> {
    const story = await this.storyRepo.checkStoryInteractionPremissions(
      storyId,
      user.id,
    );
    await this.storyRepo.checkStoryPublisherInteractionPremissions(
      story.publisherId,
      user.id,
    );

    const res = await this.storyRepo.getPrevUserStory(storyId, user.id);
    return res;
  }
}
