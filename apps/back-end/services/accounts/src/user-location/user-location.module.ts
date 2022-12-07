import { Module } from '@nestjs/common';
import { UserLocationService } from './user-location.service';
import { UserLocationResolver } from './user-location.resolver';

@Module({
  providers: [UserLocationResolver, UserLocationService]
})
export class UserLocationModule {}
