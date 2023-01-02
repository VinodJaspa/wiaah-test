import { Module } from '@nestjs/common';
import { UserInterestService } from './user-interest.service';
import { UserInterestResolver } from './user-interest.resolver';

@Module({
  providers: [UserInterestResolver, UserInterestService]
})
export class UserInterestModule {}
