import { Module } from '@nestjs/common';
import { UserInterestResolver } from './user-interest.resolver';

@Module({
  providers: [UserInterestResolver],
})
export class UserInterestModule {}
