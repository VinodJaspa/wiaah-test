import { NewsfeedHashtagSearch } from '@entities';
import { GetHashtagNewsfeedPostsInput } from '@input';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prismaService';

@Injectable()
export class HashtagService {
  constructor(private readonly prisma: PrismaService) {}

  async getHashtagNewsfeedPosts(
    input: GetHashtagNewsfeedPostsInput,
    userId?: string,
  ): Promise<NewsfeedHashtagSearch> {
    const searchPosts = await this.prisma.hashtagSearch.findFirst({
      where: {
        AND: [
          {
            profileId: input.profileId,
          },
          {
            tag: input.tag,
          },
        ],
      },
    });

    const mostLikedPost = await this.prisma.newsfeedPost.findFirst({
      where: {
        visibility: 'public',
      },
      orderBy: {
        reactionNum: 'asc',
      },
    });

    const mostCommentedPost = await this.prisma.newsfeedPost.findFirst({
      where: {
        visibility: 'public',
      },
      orderBy: {
        comments: 'asc',
      },
    });

    const mostLikedVideo = await this.prisma.newsfeedPost.findFirst({
      where: {
        visibility: 'public',
      },
      orderBy: {
        reactionNum: 'asc',
      },
    });

    const mostViewedVideo = await this.prisma.newsfeedPost.findFirst({
      where: {
        visibility: 'public',
      },
      orderBy: {
        comments: 'asc',
      },
    });

    const updatedSearch = searchPosts
      ? await this.prisma.hashtagSearch.update({
          where: {
            id: searchPosts.id,
          },
          data: {
            views: {
              increment: 1,
            },
          },
        })
      : await this.prisma.hashtagSearch.create({
          data: {
            profileId: input.profileId,
            tag: input.tag,
            userId: input.userId,
            views: 1,
          },
        });

    return {
      ...updatedSearch,
      mostLikedPost,
      mostCommentedPost,
      mostLikedVideo,
      mostViewedVideo,
    };
  }
}
