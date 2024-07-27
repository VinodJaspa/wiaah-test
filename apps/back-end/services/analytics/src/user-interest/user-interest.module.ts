import { Module } from '@nestjs/common';
import { UserInterestsQueryHandlers } from './queries';
import { UserInterestResolver } from './user-interest.resolver';
import { KafkaModule } from 'src/kafka.module';

@Module({
  imports: [KafkaModule],
  providers: [UserInterestResolver, ...UserInterestsQueryHandlers],
})
export class UserInterestModule { }
