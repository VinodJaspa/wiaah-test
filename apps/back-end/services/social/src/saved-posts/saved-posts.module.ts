import { Module } from '@nestjs/common';
import { SavedPostsService } from './saved-posts.service';
import { SavedPostsResolver } from './saved-posts.resolver';
import { ContentDiscoveryModule } from '@content-discovery';
import { PrismaService } from 'prismaService';
import { SavesCollectionResolver } from './saves-collection.resolver';

@Module({
  imports: [ContentDiscoveryModule],
  providers: [
    SavedPostsResolver,
    SavedPostsService,
    PrismaService,
    SavesCollectionResolver,
  ],
})
export class SavedPostsModule {}
