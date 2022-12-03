import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IncreaseUserActiveTimeCommand } from '@user-activity-stats/commands/impl';
import { UserActivityStats } from '@user-activity-stats/entities';
import { UserActivityRepository } from '@user-activity-stats/repository';

@CommandHandler(IncreaseUserActiveTimeCommand)
export class IncreaseUserActiveTimeCommandHandler
  implements ICommandHandler<IncreaseUserActiveTimeCommand>
{
  constructor(private readonly repo: UserActivityRepository) {}

  async execute({
    mins,
    userId,
  }: IncreaseUserActiveTimeCommand): Promise<UserActivityStats> {
    const res = await this.repo.updateUserActiveMins(userId, mins);
    return res;
  }
}
