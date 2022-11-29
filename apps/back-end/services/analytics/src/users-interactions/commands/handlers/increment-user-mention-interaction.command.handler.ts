import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersInteractions } from '@prisma-client';
import {
  IntInputTypeEnum,
  UsersInteractionsRepository,
} from '@users-interations/repository';
import { IncrementUserMentionInteractionCommand } from '@users-interations/commands/impl';
import { USER_INTERACTION_SCORE } from '@users-interations/const';

@CommandHandler(IncrementUserMentionInteractionCommand)
export class IncrementUserMentionInteractionCommandHandler
  implements ICommandHandler<IncrementUserMentionInteractionCommand>
{
  constructor(private readonly repo: UsersInteractionsRepository) {}

  async execute({
    mentionedId,
    userId,
  }: IncrementUserMentionInteractionCommand): Promise<UsersInteractions> {
    const res = await this.repo.update(userId, mentionedId, {
      mentions: { type: IntInputTypeEnum.increment, value: 1 },
      interactionScore: {
        type: IntInputTypeEnum.increment,
        value: USER_INTERACTION_SCORE.mention,
      },
    });

    return res;
  }
}
