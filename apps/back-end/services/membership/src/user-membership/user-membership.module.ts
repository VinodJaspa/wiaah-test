import { Module } from '@nestjs/common';
import { UserMembershipService } from './user-membership.service';
import { UserMembershipResolver } from './user-membership.resolver';

@Module({
  providers: [UserMembershipResolver, UserMembershipService]
})
export class UserMembershipModule {}
