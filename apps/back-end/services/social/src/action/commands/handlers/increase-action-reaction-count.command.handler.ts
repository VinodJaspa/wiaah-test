import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IncreaseActionReactionCountCommand } from '@action/commands/impl';
import { ActionRepository } from '@action/repository';
import { Action } from '@action/entities';

@CommandHandler(IncreaseActionReactionCountCommand)
export class IncreaseActionReactionCountCommandHandler
  implements ICommandHandler<IncreaseActionReactionCountCommand>
{
  constructor(private readonly repo: ActionRepository) {}

  async execute({
    actionId,
  }: IncreaseActionReactionCountCommand): Promise<Action> {
    const res = await this.repo.updateReactionCount(actionId, 1);

    return res;
  }
}
