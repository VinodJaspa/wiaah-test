import { Module } from '@nestjs/common';
import { UserInterestsQueryHandlers } from './queries';
import { UserInterestResolver } from './user-interest.resolver';

@Module({
  providers: [UserInterestResolver, ...UserInterestsQueryHandlers],
})
export class UserInterestModule {}
