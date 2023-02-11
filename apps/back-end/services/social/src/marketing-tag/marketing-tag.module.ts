import { Module } from '@nestjs/common';
import { MarketingTagResolver } from './marketing-tag.resolver';

@Module({
  providers: [MarketingTagResolver],
})
export class MarketingTagModule {}
