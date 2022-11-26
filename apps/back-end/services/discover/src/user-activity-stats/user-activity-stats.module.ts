import { Module } from '@nestjs/common';
import { UserActivityStatsResolver } from './user-activity-stats.resolver';
import { UserActivityStatsController } from './user-activity-stats.controller';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  providers: [UserActivityStatsResolver],
  controllers: [UserActivityStatsController],
})
export class UserActivityStatsModule {}
