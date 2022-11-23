import { Module } from '@nestjs/common';
import { AffiliationPostResolver } from './affiliation-post.resolver';
import { affiliationPostCommandHandlers } from './commands';
import { affiliationPostQueryHandlers } from './queries';
import { AffiliationPostRepository } from './repository';
import { AffiliationPostController } from './affiliation-post.controller';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  providers: [
    AffiliationPostResolver,
    AffiliationPostRepository,
    ...affiliationPostCommandHandlers,
    ...affiliationPostQueryHandlers,
  ],
  controllers: [AffiliationPostController],
})
export class AffiliationPostModule {}
