import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IncrementUserSharesInteractionCommand } from '@users-interations/commands/impl';
import { USER_INTERACTION_SCORE } from '@users-interations/const';
import {
  NumInputTypeEnum,
  UsersInteractionsRepository,
} from '@users-interations/repository';

@CommandHandler(IncrementUserSharesInteractionCommand)
export class IncrementUserSharesInteractionCommandHandler
  implements ICommandHandler<IncrementUserSharesInteractionCommand>
{
  constructor(public readonly repo: UsersInteractionsRepository) {}

  async execute({
    sharedById,
    sharedToId,
  }: IncrementUserSharesInteractionCommand): Promise<any> {
    const res = await this.repo.update(sharedById, sharedToId, {
      shares: {
        type: NumInputTypeEnum.increment,
        value: 1,
      },
      interactionScore: {
        type: NumInputTypeEnum.increment,
        value: USER_INTERACTION_SCORE.share,
      },
    });

    return res;
  }
}
