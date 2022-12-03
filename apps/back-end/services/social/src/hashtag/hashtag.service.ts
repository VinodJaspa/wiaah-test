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

    return {
      mostLikedPost,
      mostCommentedPost,
      mostLikedVideo,
      mostViewedVideo,
    };
  }
}
