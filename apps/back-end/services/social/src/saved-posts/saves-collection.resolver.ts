import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { SavesCollection } from './entities';
import { PrismaService } from 'prismaService';
import { UserSavedPost } from '@entities';

@Resolver(() => SavesCollection)
export class SavesCollectionResolver {
  constructor(private readonly prisma: PrismaService) {}

  @ResolveField(() => [UserSavedPost])
  async recentSaves(@Parent() collection: SavesCollection) {
    const posts = await this.prisma.savedPost.findMany({
      where: {
        collectionId: collection.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 4,
    });

    return posts;
  }
}
