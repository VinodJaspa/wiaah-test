import { Module } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { HashtagResolver } from './hashtag.resolver';
import { PrismaService } from 'prismaService';

@Module({
  providers: [HashtagResolver, HashtagService, PrismaService],
})
export class HashtagModule {}
