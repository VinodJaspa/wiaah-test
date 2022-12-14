import { Module } from '@nestjs/common';
import { UserLocationResolver } from './user-location.resolver';

@Module({
  providers: [UserLocationResolver],
})
export class UserLocationModule {}
