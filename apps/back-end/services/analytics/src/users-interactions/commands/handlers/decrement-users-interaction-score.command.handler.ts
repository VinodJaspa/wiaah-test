import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersInteractions } from '@prisma-client';
import { DecrementUsersInteractionScoreCommand } from '@users-interations/commands/impl';
import { USER_INTERACTION_SCORE } from '@users-interations/const';
import {
  IntInputTypeEnum,
  UsersInteractionsRepository,
} from '@users-interations/repository';

@CommandHandler(DecrementUsersInteractionScoreCommand)
export class DecrementUsersInteractionScoreCommandHandler
  implements ICommandHandler<DecrementUsersInteractionScoreCommand>
{
  constructor(private readonly repo: UsersInteractionsRepository) {}

  async execute({
    amount,
  }: DecrementUsersInteractionScoreCommand): Promise<boolean> {
    const res = await this.repo.updateAll({
      interactionScore: {
        type: IntInputTypeEnum.increment,
        value: amount,
      },
    });
    return true;
  }
}
