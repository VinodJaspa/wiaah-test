import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Story } from '../../entities';
import { StoryRepository } from '../../repository';
import { LikeStoryCommand } from '../impl';

@CommandHandler(LikeStoryCommand)
export class LikeStoryCommandHandler
  implements ICommandHandler<LikeStoryCommand>
{
  constructor(private readonly storyRepo: StoryRepository) {}

  async execute({ input, user }: LikeStoryCommand): Promise<true> {
    await this.storyRepo.likeStory(input, user.id);

    return true;
  }
}
