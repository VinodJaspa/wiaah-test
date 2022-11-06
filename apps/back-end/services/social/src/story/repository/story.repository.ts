import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractPagination, SubtractFromDate } from 'nest-utils';
import { PrismaService } from 'prismaService';
import { Follow } from 'prismaClient';

import { CreateStoryInput, GetStorySeenByInput, LikeStoryInput } from '../dto';
import { GetRecentStoriesInput } from '../dto';
import { Story, StoryLike, StoryView, RecentStory } from '../entities';

@Injectable()
export class StoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async viewUserStories(
    publisherUserId: string,
    userId: string,
  ): Promise<Story> {
    const followRel = await this.checkStoryPublisherInteractionPremissions(
      publisherUserId,
      userId,
    );

    const story = await this.prisma.story.findFirst({
      where: {
        AND: [
          {
            publisherId: publisherUserId,
          },
          {
            createdAt: {
              gte: SubtractFromDate(new Date(), { days: 1 }),
            },
          },
          {
            createdAt: {
              gte: followRel.followerLastStorySeenAt,
            },
          },
        ],
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return story;
  }

  async updateUserFollowerStoryLastSeenAt(relId: string) {
    await this.prisma.follow.update({
      data: {
        followerLastStorySeenAt: new Date(),
      },
      where: {
        id: relId,
      },
    });
  }

  async updatePublisherStoryLastPostedAt(relId: string) {
    await this.prisma.follow.update({
      where: {
        id: relId,
      },
      data: {
        followingLastStoryPostedAt: new Date(),
      },
    });
  }

  async getRecentStories(
    { pagination }: GetRecentStoriesInput,
    userId: string,
  ): Promise<RecentStory[]> {
    const { skip, take } = ExtractPagination(pagination);

    const follows = await this.prisma.follow.findMany({
      where: {
        AND: [
          {
            followerUserId: userId,
          },
        ],
      },
      orderBy: {
        followingLastStoryPostedAt: 'desc',
      },
      skip,
      take,
    });

    return follows.map((v) => ({
      userId: v.followingUserId,
      newStory:
        Date.parse(new Date(v.followingLastStoryPostedAt).toString()) >
          Date.parse(new Date(v.followerLastStorySeenAt).toString()) || false,
    }));
  }

  async create(input: CreateStoryInput, userId: string): Promise<Story> {
    const story = await this.prisma.story.create({
      data: { ...input, publisherId: userId },
      include: {
        views: true,
      },
    });

    return story;
  }

  async getSeenBy(
    { pagination, storyId }: GetStorySeenByInput,
    userId: string,
  ): Promise<StoryView[]> {
    const { skip, take } = ExtractPagination(pagination);

    const story = await this.getUnprotectedStory(storyId);

    if (story.publisherId !== userId)
      throw new UnauthorizedException(
        'you can only see story views of your stories',
      );

    const views = await this.prisma.storyView.findMany({
      skip,
      take,
      where: {
        storyId,
      },
    });

    return views;
  }

  async likeStory(input: LikeStoryInput, userId: string) {
    await this.checkStoryPublisherInteractionPremissions(input.storyId, userId);

    const liked = await this.haveLikedStory(input.storyId, userId);

    if (!!liked) {
      await this.prisma.storyLike.delete({
        where: {
          id: liked.id,
        },
      });
    } else {
      await this.prisma.storyLike.create({
        data: {
          userId,
          storyId: input.storyId,
        },
      });
    }
  }

  async haveLikedStory(
    storyId: string,
    userId: string,
  ): Promise<StoryLike | null> {
    const liked = await this.prisma.storyLike.findFirst({
      where: {
        storyId,
        userId,
      },
    });

    return liked;
  }

  async checkStoryPublisherInteractionPremissions(
    publisherId: string,
    userId: string,
  ): Promise<Follow | null> {
    const followRel = await this.prisma.follow.findFirst({
      where: {
        AND: [
          {
            followerUserId: userId,
          },
          {
            followingUserId: publisherId,
          },
        ],
      },
    });
    if (!followRel)
      throw new UnauthorizedException(
        'you can only view stories by users you follow',
      );

    return followRel;
  }

  getUnprotectedStory(storyId: string): Promise<Story> {
    return this.prisma.story.findUnique({
      where: {
        id: storyId,
      },
    });
  }
}
