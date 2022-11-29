import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersInteractions } from '@prisma-client';
import {
  IntInputTypeEnum,
  UsersInteractionsRepository,
} from '@users-interations/repository';
import { IncrementUserCommentsReplyInteractionCommand } from '@users-interations/commands/impl';
import { USER_INTERACTION_SCORE } from '@users-interations/const';

@CommandHandler(IncrementUserCommentsReplyInteractionCommand)
export class IncrementCommentsCommandHandler
  implements ICommandHandler<IncrementUserCommentsReplyInteractionCommand>
{
  constructor(private readonly repo: UsersInteractionsRepository) {}
  async execute({
    commentedById,
    commentedToId,
  }: IncrementUserCommentsReplyInteractionCommand): Promise<UsersInteractions> {
    const res = await this.repo.update(commentedById, commentedToId, {
      comments: {
        type: IntInputTypeEnum.increment,
        value: 1,
      },
      interactionScore: {
        type: IntInputTypeEnum.increment,
        value: USER_INTERACTION_SCORE.commentReply,
      },
    });
    return res;
  }
}
