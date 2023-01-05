import { Module } from '@nestjs/common';
import { kafkaModule } from '../kafka.module';
import { FriendsResolver } from './friends.resolver';

@Module({
  imports: [kafkaModule],
  providers: [FriendsResolver],
})
export class FriendsModule {}
