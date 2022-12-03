import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BlockUserCommand } from '@block/commands/impl';
import { BlockRepository } from '@block/repository';

@CommandHandler(BlockUserCommand)
export class BlockUserCommandHandler
  implements ICommandHandler<BlockUserCommand>
{
  constructor(private readonly repo: BlockRepository) {}

  async execute({ blocker, input }: BlockUserCommand): Promise<boolean> {
    const res = await this.repo.create(blocker.id, input.userId);
    if (!res) return false;

    return true;
  }
}
