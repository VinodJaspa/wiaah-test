import { kafkaModule } from '@kafkaModule';
import { Module } from '@nestjs/common';
import { FriendsResolver } from './friends.resolver';

@Module({
  imports: [kafkaModule],
  providers: [FriendsResolver],
})
export class FriendsModule {}
