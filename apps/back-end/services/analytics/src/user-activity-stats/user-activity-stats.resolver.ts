import { Resolver } from '@nestjs/graphql';
import { UserActivityStats } from '@user-activity-stats/entities';

@Resolver(() => UserActivityStats)
export class UserActivityStatsResolver {}
