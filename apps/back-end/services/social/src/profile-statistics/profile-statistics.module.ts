import { Module } from '@nestjs/common';
import { ProfileStatisticsResolver } from './profile-statistics.resolver';

@Module({
  providers: [ProfileStatisticsResolver],
})
export class ProfileStatisticsModule {}
