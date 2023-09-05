import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ExtractPagination, SubtractFromDate } from 'nest-utils';
import { PrismaService } from 'prismaService';
import { Follow, Story, StoryLike, StoryType, StoryView } from 'prismaClient';

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

  async getPrevUserStory(storyId: string, userId: string): Promise<Story> {
    const story = await this.prisma.story.findUnique({
      where: {
        id: storyId,
      },
    });

    const targetedStory = await this.prisma.story.findFirst({
      cursor: {
        id: story.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        AND: [
          {
            publisherId: story.publisherId,
          },
          {
            createdAt: {
              gte: SubtractFromDate(new Date(), { days: 1 }),
            },
          },
        ],
      },
      skip: 1,
      take: 1,
    });

    return targetedStory;
  }

  async updateUserFollowerStoryLastSeenAt(story: Story, userId: string) {
    await this.prisma.follow.update({
      data: {
        followerLastStorySeenAt: new Date(story.createdAt),
      },
      where: {
        followRelation: {
          followerUserId: userId,
          followingUserId: story.publisherId,
        },
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

    const filtered = follows.filter(
      (v) => new Date(v.followedAt) < new Date(v.followingLastStoryPostedAt),
    );

    return filtered.map((v) => ({
      userId: v.followingUserId,
      newStory:
        new Date(v.followingLastStoryPostedAt) >
        new Date(v.followerLastStorySeenAt),
    }));
  }

  async create(input: CreateStoryInput, userId: string): Promise<Story> {
    const story = await this.prisma.story.create({
      data: {
        ...input,
        publisherId: userId,
        type: this.getStoryTypeFromInput(input),
      },
      include: {
        views: true,
      },
    });

    const follow = await this.prisma.follow.findFirst({
      where: {
        followingUserId: userId,
      },
    });

    await this.updatePublisherStoryLastPostedAt(follow.id);

    return story;
  }

  getStoryTypeFromInput(input: CreateStoryInput): StoryType {
    if (input.attachment) {
      if (input.attachment.type === 'img') {
        return 'image';
      }
      if (input.attachment.type === 'vid') {
        return 'video';
      }
    }
    if (input.affiliationPostId) {
      return 'affiliation';
    }
    if (input.newsfeedPostId) {
      return 'post';
    }
    if (input.shopPostId) {
      return 'product';
    }
    if (input.servicePostId) {
      return 'service';
    }
    return 'text';
  }

  async getSeenBy(
    { pagination, storyId }: GetStorySeenByInput,
    userId: string,
    usernameQ?: string,
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
        AND: [
          {
            storyId,
          },
          ...(usernameQ
            ? [
                {
                  viewer: {
                    username: {
                      contains: usernameQ,
                    },
                  },
                },
              ]
            : null),
        ],
      },
    });

    return views;
  }

  async incrementStoryViews(storyId: string, userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        ownerId: userId,
      },
    });
    const story = await this.prisma.story.findUnique({
      where: {
        id: storyId,
      },
    });
    if (!story) throw new BadRequestException();

    const viewed = await this.haveViewedStory(story.id, userId);

    if (viewed) return story;

    return await this.prisma.story.update({
      data: {
        viewsCount: {
          increment: 1,
        },
        views: {
          create: {
            viewerId: userId,
            storyPublisherProfileId: profile.id,
            gender: profile.gender,
          },
        },
      },
      where: {
        id: storyId,
      },
    });
  }

  async likeStory(input: LikeStoryInput, userId: string): Promise<Story> {
    const story = await this.checkStoryInteractionPremissions(
      input.storyId,
      userId,
    );
    await this.checkStoryPublisherInteractionPremissions(
      story.publisherId,
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
  async haveViewedStory(storyId: string, userId: string): Promise<StoryView> {
    const view = await this.prisma.storyView.findUnique({
      where: {
        storyViewIds: {
          storyId,
          viewerId: userId,
        },
      },
    });
    return view;
  }

  async checkStoryPublisherInteractionPremissions(
    publisherId: string,
    userId: string,
  ): Promise<Follow | null> {
    if (publisherId === userId)
      throw new UnprocessableEntityException(
        'you cannot interact with your own stories',
      );
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
