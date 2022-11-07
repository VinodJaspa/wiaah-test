import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ExtractPagination, SubtractFromDate } from 'nest-utils';
import { PrismaService } from 'prismaService';
import { Follow, Story, StoryLike, StoryView } from 'prismaClient';

import { CreateStoryInput, GetStorySeenByInput, LikeStoryInput } from '../dto';
import { GetRecentStoriesInput } from '../dto';
import { RecentStory } from '../entities';

@Injectable()
export class StoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async DeleteStory(storyId: string, userId: string): Promise<Story> {
    const story = await this.checkStoryCrudPremissions(storyId, userId);

    await this.prisma.story.delete({
      where: {
        id: story.id,
      },
    });

    return story;
  }

  async getUserStories(userId: string): Promise<Story[]> {
    return await this.prisma.story.findMany({
      where: {
        publisherId: userId,
      },
    });
  }

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

  async likeStory(input: LikeStoryInput, userId: string): Promise<Story> {
    await this.checkStoryPublisherInteractionPremissions(input.storyId, userId);
    const story = await this.checkStoryInteractionPremissions(
      input.storyId,
      userId,
    );

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

    return story;
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

  async checkStoryInteractionPremissions(
    storyId: string,
    userId: string,
  ): Promise<Story> {
    const story = await this.prisma.story.findUnique({
      where: {
        id: storyId,
      },
    });
    if (!story)
      throw new NotFoundException('story with the given id was not found');
    return story;
  }

  async checkStoryCrudPremissions(
    storyId: string,
    userId: string,
  ): Promise<Story> {
    const story = await this.prisma.story.findUnique({
      where: {
        id: storyId,
      },
    });

    if (story.publisherId !== userId)
      throw new UnauthorizedException('you can cannot preform this action');

    return story;
  }

  getUnprotectedStory(storyId: string): Promise<Story> {
    return this.prisma.story.findUnique({
      where: {
        id: storyId,
      },
    });
  }
}
