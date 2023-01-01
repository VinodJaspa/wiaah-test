import { Module } from '@nestjs/common';
import { FriendsResolver } from './friends.resolver';

@Module({
  providers: [FriendsResolver],
})
export class FriendsModule {}
