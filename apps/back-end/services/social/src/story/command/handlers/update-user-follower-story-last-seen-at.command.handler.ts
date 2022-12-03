import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { StoryRepository } from '../../repository';
import { UpdateUserFollowerStoryLastSeenAtCommand } from '../impl';

@CommandHandler(UpdateUserFollowerStoryLastSeenAtCommand)
export class UpdateUserFollowerStoryLastSeenAtCommandHandler
  implements ICommandHandler<UpdateUserFollowerStoryLastSeenAtCommand>
{
  constructor(private readonly storyRepo: StoryRepository) {}

  async execute({
    viewer,
    story,
  }: UpdateUserFollowerStoryLastSeenAtCommand): Promise<void> {
    const res = await this.storyRepo.updateUserFollowerStoryLastSeenAt(
      story,
      viewer.id,
    );
  }
}
