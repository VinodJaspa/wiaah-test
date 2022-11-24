import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DecreaseActionReactionCountCommand } from '@action/commands/impl';
import { ActionRepository } from '@action/repository';
import { Action } from '@action/entities';

@CommandHandler(DecreaseActionReactionCountCommand)
export class DecreaseActionReactionCountCommandHandler
  implements ICommandHandler<DecreaseActionReactionCountCommand>
{
  constructor(private readonly repo: ActionRepository) {}

  async execute({
    actionId,
  }: DecreaseActionReactionCountCommand): Promise<Action> {
    const res = await this.repo.updateReactionCount(actionId, 1, true);

    return res;
  }
}
