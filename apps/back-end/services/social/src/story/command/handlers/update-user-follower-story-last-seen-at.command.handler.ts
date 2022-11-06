import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { StoryRepository } from '../../repository';
import { UpdateUserFollowerStoryLastSeenAtCommand } from '../impl';

@CommandHandler(UpdateUserFollowerStoryLastSeenAtCommand)
export class UpdateUserFollowerStoryLastSeenAtCommandHandler
  implements ICommandHandler<UpdateUserFollowerStoryLastSeenAtCommand>
{
  constructor(private readonly storyRepo: StoryRepository) {}

  async execute({
    usersRelations,
  }: UpdateUserFollowerStoryLastSeenAtCommand): Promise<void> {
    const res = await this.storyRepo.updateUserFollowerStoryLastSeenAt(
      usersRelations.id,
    );
  }
}
