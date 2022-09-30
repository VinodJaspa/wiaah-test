import { Module } from '@nestjs/common';
import { SavedPostsService } from './saved-posts.service';
import { SavedPostsResolver } from './saved-posts.resolver';
import { ContentDiscoveryModule } from '@content-discovery';
import { PrismaService } from 'prismaService';

@Module({
  imports: [ContentDiscoveryModule],
  providers: [SavedPostsResolver, SavedPostsService, PrismaService],
})
export class SavedPostsModule {}
