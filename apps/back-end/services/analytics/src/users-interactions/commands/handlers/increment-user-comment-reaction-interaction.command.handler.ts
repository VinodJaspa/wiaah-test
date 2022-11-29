import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  IntInputTypeEnum,
  UsersInteractionsRepository,
} from '@users-interations/repository';
import { IncreamentUserCommentReactionInteractionCommand } from '@users-interations/commands/impl';
import { UsersInteractions } from '@prisma-client';
import { USER_INTERACTION_SCORE } from '@users-interations/const';

@CommandHandler(IncreamentUserCommentReactionInteractionCommand)
export class IncreamentUserCommentReactionInteractionCommandHandler
  implements ICommandHandler<IncreamentUserCommentReactionInteractionCommand>
{
  constructor(private readonly repo: UsersInteractionsRepository) {}

  async execute({
    reactedById,
    reactedToId,
  }: IncreamentUserCommentReactionInteractionCommand): Promise<UsersInteractions> {
    const res = await this.repo.update(reactedById, reactedToId, {
      commentsLikes: { type: IntInputTypeEnum.increment, value: 1 },
      interactionScore: {
        type: IntInputTypeEnum.increment,
        value: USER_INTERACTION_SCORE.commentLike,
      },
    });

    return res;
  }
}
