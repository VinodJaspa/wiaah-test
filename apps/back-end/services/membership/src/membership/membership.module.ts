import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { membershipCommandHandlers } from './commands';
import { MembershipResolver } from './membership.resolver';
import { membershipQueryHandlers } from './queries';
import { MembershipRepository } from './repository';
import { exntededResolvers } from './extendedResolvers';

@Module({
  imports: [CqrsModule],
  providers: [
    MembershipResolver,
    MembershipRepository,
    ...exntededResolvers,
    ...membershipCommandHandlers,
    ...membershipQueryHandlers,
  ],
})
export class MembershipModule {}
