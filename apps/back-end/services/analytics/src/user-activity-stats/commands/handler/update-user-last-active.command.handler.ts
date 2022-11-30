import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserLastActiveCommand } from '@user-activity-stats/commands/impl';
import { UserActivityStats } from '@user-activity-stats/entities';
import { UserActivityRepository } from '@user-activity-stats/repository';

@CommandHandler(UpdateUserLastActiveCommand)
export class UpdateUserLastActiveCommandHandler
  implements ICommandHandler<UpdateUserLastActiveCommand>
{
  constructor(private readonly repo: UserActivityRepository) {}

  async execute({
    userId,
  }: UpdateUserLastActiveCommand): Promise<UserActivityStats> {
    const res = await this.repo.updateUserLastActive(userId, new Date());
    return res;
  }
}
