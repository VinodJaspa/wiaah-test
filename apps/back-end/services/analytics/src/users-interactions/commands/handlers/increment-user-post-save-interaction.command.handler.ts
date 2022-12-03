import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersInteractions } from '@prisma-client';
import { IncrementUserPostSaveInteractionCommand } from '@users-interations/commands/impl';
import { USER_INTERACTION_SCORE } from '@users-interations/const';
import {
  NumInputTypeEnum,
  UsersInteractionsRepository,
} from '@users-interations/repository';

@CommandHandler(IncrementUserPostSaveInteractionCommand)
export class IncrementUserPostSaveInteractionCommandHandler
  implements ICommandHandler<IncrementUserPostSaveInteractionCommand>
{
  constructor(private readonly repo: UsersInteractionsRepository) {}

  async execute({
    authorId,
    userId,
  }: IncrementUserPostSaveInteractionCommand): Promise<UsersInteractions> {
    const res = await this.repo.update(userId, authorId, {
      postSaved: {
        type: NumInputTypeEnum.increment,
        value: 1,
      },
      interactionScore: {
        type: NumInputTypeEnum.increment,
        value: USER_INTERACTION_SCORE.postSave,
      },
    });

    return res;
  }
}
