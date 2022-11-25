import { Module } from '@nestjs/common';
import { CommunityResolver } from './community.resolver';

@Module({
  providers: [CommunityResolver],
})
export class CommunityModule {}
