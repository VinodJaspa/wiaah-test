import { Module } from '@nestjs/common';
import { PinnedContentResolver } from './pinned-content.resolver';

@Module({
  providers: [PinnedContentResolver],
})
export class PinnedContentModule {}
