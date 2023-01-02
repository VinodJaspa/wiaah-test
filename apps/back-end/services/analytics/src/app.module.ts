import { Module } from '@nestjs/common';
import { UserActivityStatsModule } from '@user-activity-stats/user-activity-stats.module';
import { PrismaModule } from './prisma.module';
import { UsersInteractionsModule } from './users-interactions/users-interactions.module';
import { EventsModule } from './events/events.module';
import { UserPlaceInteractionsModule } from './user-place-interactions/user-place-interactions.module';
import { UserInterestModule } from './user-interest/user-interest.module';

@Module({
  imports: [UsersInteractionsModule, UserActivityStatsModule, PrismaModule, EventsModule, UserPlaceInteractionsModule, UserInterestModule],
})
export class AppModule {}
