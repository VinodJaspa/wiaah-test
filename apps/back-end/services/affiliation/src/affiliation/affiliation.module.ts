import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AffiliationResolver } from './affiliation.resolver';
import { AffiliationCommandHandlers } from './commands';
import { affiliationQueryHandlers } from './queries';
import { AffiliationRepository } from './repository';

@Module({
  imports: [CqrsModule],
  providers: [
    AffiliationResolver,
    AffiliationRepository,
    ...affiliationQueryHandlers,
    ...AffiliationCommandHandlers,
  ],
})
export class AffiliationModule {}
