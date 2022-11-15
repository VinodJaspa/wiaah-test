import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { unBlockUserCommand } from '@block/commands/impl';
import { BlockRepository } from '@block/repository';

@CommandHandler(unBlockUserCommand)
export class unBlockUserCommandHandler
  implements ICommandHandler<unBlockUserCommand>
{
  constructor(private readonly repo: BlockRepository) {}

  async execute({ input, user }: unBlockUserCommand): Promise<boolean> {
    const res = await this.repo.removeBlock(input.userId, user.id);
    if (!res) return false;

    return true;
  }
}
