import { Module } from '@nestjs/common';
import { SocialTagResolver } from './social-tag.resolver';

@Module({
  providers: [SocialTagResolver],
})
export class SocialTagModule {}
