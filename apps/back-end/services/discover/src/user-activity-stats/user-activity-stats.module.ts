import { Module } from '@nestjs/common';
import { UserActivityStatsResolver } from './user-activity-stats.resolver';
import { UserActivityStatsController } from './user-activity-stats.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { UserActivityRepository } from './repository';
import { userActivityScoreCommandHandlers } from './commands';
import { userActivityStatsQueryHandlers } from './queries';

@Module({
  imports: [CqrsModule],
  providers: [
    UserActivityStatsResolver,
    UserActivityRepository,
    ...userActivityScoreCommandHandlers,
    ...userActivityStatsQueryHandlers,
  ],
  controllers: [UserActivityStatsController],
})
export class UserActivityStatsModule {}
