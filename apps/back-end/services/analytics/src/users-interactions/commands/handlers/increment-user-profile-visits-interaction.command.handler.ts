import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersInteractions } from '@prisma-client';
import { IncrementUserProfileVisitsInteractionCommand } from '@users-interations/commands/impl';
import { USER_INTERACTION_SCORE } from '@users-interations/const';
import {
  NumInputTypeEnum,
  UsersInteractionsRepository,
} from '@users-interations/repository';

@CommandHandler(IncrementUserProfileVisitsInteractionCommand)
export class IncrementUserProfileVisitsInteractionCommandHandler
  implements ICommandHandler<IncrementUserProfileVisitsInteractionCommand>
{
  constructor(private readonly repo: UsersInteractionsRepository) {}

  async execute({
    profileAuthorId,
    userId,
  }: IncrementUserProfileVisitsInteractionCommand): Promise<UsersInteractions> {
    const res = await this.repo.update(userId, profileAuthorId, {
      profileVisits: {
        type: NumInputTypeEnum.increment,
        value: 1,
      },
      interactionScore: {
        type: NumInputTypeEnum.increment,
        value: USER_INTERACTION_SCORE.profileVisit,
      },
    });

    return res;
  }
}
