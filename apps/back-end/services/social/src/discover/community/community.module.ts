import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommunityResolver } from './community.resolver';

@Module({
  imports: [CqrsModule],
  providers: [CommunityResolver],
})
export class CommunityModule {}
