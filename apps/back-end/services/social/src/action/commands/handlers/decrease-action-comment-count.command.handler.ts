import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DecreaseActionCommentCountCommand } from '@action/commands/impl';
import { ActionRepository } from '@action/repository';
import { Action } from '@action/entities';

@CommandHandler(DecreaseActionCommentCountCommand)
export class DecreaseActionCommentCountCommandHandler
  implements ICommandHandler<DecreaseActionCommentCountCommand>
{
  constructor(private readonly repo: ActionRepository) {}

  async execute({
    actionId,
  }: DecreaseActionCommentCountCommand): Promise<Action> {
    const res = await this.repo.updateCommentsCount(actionId, 1, true);

    return res;
  }
}
