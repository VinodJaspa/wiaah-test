import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { membershipCommandHandlers } from './commands';
import { MembershipResolver } from './membership.resolver';
import { membershipQueryHandlers } from './queries';
import { MembershipRepository } from './repository';

@Module({
  imports: [CqrsModule],
  providers: [
    MembershipResolver,
    MembershipRepository,
    ...membershipCommandHandlers,
    ...membershipQueryHandlers,
  ],
})
export class MembershipModule {}
