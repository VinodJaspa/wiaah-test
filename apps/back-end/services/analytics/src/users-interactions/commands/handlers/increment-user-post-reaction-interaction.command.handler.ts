import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersInteractions } from '@prisma-client';
import { IncreamentUserPostReactionInteractionCommand } from '@users-interations/commands';
import { USER_INTERACTION_SCORE } from '@users-interations/const';
import {
  NumInputTypeEnum,
  UsersInteractionsRepository,
} from '@users-interations/repository';

@CommandHandler(IncreamentUserPostReactionInteractionCommand)
export class IncreamentUserPostReactionInteractionCommandHandler
  implements ICommandHandler<IncreamentUserPostReactionInteractionCommand>
{
  constructor(private readonly repo: UsersInteractionsRepository) {}

  async execute({
    reactedById,
    reactedToId,
  }: IncreamentUserPostReactionInteractionCommand): Promise<UsersInteractions> {
    const res = await this.repo.update(reactedById, reactedToId, {
      postLikes: { type: NumInputTypeEnum.increment, value: 1 },
      interactionScore: {
        type: NumInputTypeEnum.increment,
        value: USER_INTERACTION_SCORE.postLike,
      },
    });

    return res;
  }
}
