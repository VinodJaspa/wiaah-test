import { UserSavedPostsGroup } from '@entities';
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import {
  accountType,
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  NoDeletePremissionPublicError,
  NotOwnerOfResourcePublicError,
} from 'nest-utils';
import { GetMySavedPostsInput } from './dto';
import { SavedPostsService } from './saved-posts.service';
import { PrismaService } from 'prismaService';
import { SavesCollection } from './entities';

@Resolver()
@UseGuards(new GqlAuthorizationGuard([]))
export class SavedPostsResolver {
  constructor(
    private readonly savedPostsService: SavedPostsService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => UserSavedPostsGroup)
  getMySavedPosts(
    @Args('args') args: GetMySavedPostsInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.savedPostsService.getUserSavedPosts(args, user.id);
  }

  @Mutation(() => Boolean)
  async createSavesCollection(
    @Args('name') name: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    const saved = await this.prisma.savesCollection.create({
      data: {
        userId: user.id,
        name,
      },
    });
    return true;
  }

  @Query(() => [SavesCollection])
  async getUserSaveCollections(
    @Args('userId') id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    await this.savedPostsService.validateReadPremission(id, user);
    const collections = await this.prisma.savesCollection.findMany({
      where: {
        userId: id,
      },
    });

    return collections;
  }

  @Mutation(() => Boolean)
  async deleteSavesCollection(
    @Args('id') id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    const collection = await this.prisma.savesCollection.findUnique({
      where: {
        id: user.id,
      },
    });

    if (collection.userId !== user.id)
      throw new NoDeletePremissionPublicError();

    await this.prisma.savesCollection.delete({
      where: {
        id,
      },
    });

    await this.prisma.savedItem.deleteMany({
      where: {
        collectionId: collection.id,
      },
    });

    return true;
  }

  @Mutation(() => Boolean)
  async savePost(
    @Args('postId') postId: string,
    @Args('collectionId') collectionId: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    const saved = await this.savedPostsService.savePost(
      postId,
      collectionId,
      user.id,
    );
    return true;
  }

  @Query(() => UserSavedPostsGroup)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  adminGetAccountSavedPosts(
    @Args('args') args: GetMySavedPostsInput,
    @Args('accountId') id: string,
  ) {
    return this.savedPostsService.getUserSavedPosts(args, id);
  }
}
