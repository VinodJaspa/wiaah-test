import { Module } from '@nestjs/common';
import { UserActivityStatsModule } from '@user-activity-stats/user-activity-stats.module';
import { PrismaModule } from './prisma.module';
import { UsersInteractionsModule } from './users-interactions/users-interactions.module';

@Module({
  imports: [UsersInteractionsModule, UserActivityStatsModule, PrismaModule],
})
export class AppModule {}
