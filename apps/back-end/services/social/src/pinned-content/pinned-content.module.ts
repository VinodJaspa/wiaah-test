import { Module } from '@nestjs/common';
import { PinnedContentService } from './pinned-content.service';
import { PinnedContentResolver } from './pinned-content.resolver';

@Module({
  providers: [PinnedContentResolver, PinnedContentService]
})
export class PinnedContentModule {}
