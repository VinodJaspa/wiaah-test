import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IncreaseUserActivityScoreCommand } from '@user-activity-stats/commands';
import { UserActivityStats } from '@user-activity-stats/entities';
import { UserActivityRepository } from '@user-activity-stats/repository';

@CommandHandler(IncreaseUserActivityScoreCommand)
export class IncreaseUserActivityScoreCommandHandler
  implements ICommandHandler<IncreaseUserActivityScoreCommand>
{
  constructor(private readonly repo: UserActivityRepository) {}

  async execute({
    userId,
    score,
  }: IncreaseUserActivityScoreCommand): Promise<UserActivityStats> {
    const res = await this.repo.updateUserScore({
      increase: true,
      score,
      userId,
    });
    return res;
  }
}
