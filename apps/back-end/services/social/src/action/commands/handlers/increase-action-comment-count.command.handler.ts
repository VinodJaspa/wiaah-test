import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IncreaseActionCommentCountCommand } from '@action/commands/impl';
import { ActionRepository } from '@action/repository';
import { Action } from '@action/entities';

@CommandHandler(IncreaseActionCommentCountCommand)
export class IncreaseActionCommentCountCommandHandler
  implements ICommandHandler<IncreaseActionCommentCountCommand>
{
  constructor(private readonly repo: ActionRepository) {}

  async execute({
    actionId,
  }: IncreaseActionCommentCountCommand): Promise<Action> {
    const res = await this.repo.updateCommentsCount(actionId, 1);

    return res;
  }
}
