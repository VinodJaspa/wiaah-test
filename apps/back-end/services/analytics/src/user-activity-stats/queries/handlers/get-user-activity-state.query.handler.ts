import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserActivityStats } from '@user-activity-stats/entities';
import { GetUserActivityStatsQuery } from '@user-activity-stats/queries';
import { UserActivityRepository } from '@user-activity-stats/repository';

@QueryHandler(GetUserActivityStatsQuery)
export class GetUserActivityStatsQueryHandler
  implements IQueryHandler<GetUserActivityStatsQuery>
{
  constructor(private readonly repo: UserActivityRepository) {}

  async execute({
    userId,
  }: GetUserActivityStatsQuery): Promise<UserActivityStats> {
    const res = await this.repo.getOne(userId);
    return res;
  }
}
