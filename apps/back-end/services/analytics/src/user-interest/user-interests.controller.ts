import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { UserInterestKeyword } from '@prisma-client';
import {
  ContentReactedEvent,
  GetUserInterestsScoresMessage,
  GetUserInterestsScoresMessageReply,
} from 'nest-dto';
import { KAFKA_EVENTS, KAFKA_MESSAGES } from 'nest-utils';
import { PrismaService } from 'prismaService';

@Controller()
export class UserInterestsController {
  constructor(private readonly prisma: PrismaService) {}

  @EventPattern(KAFKA_EVENTS.REACTION_EVENTS.contentReacted('*'))
  async handleSocialContentReaction(
    @Payload() { value }: { value: ContentReactedEvent },
  ) {
    const keywords = value.input.keywords;
    const userId = value.input.reacterUserId;

    if (keywords) {
      const user = await this.prisma.userInterest.findUnique({
        where: {
          userId,
        },
      });

      if (user) {
        const oldKeywords = user.keywords;

        const weightedKeywords: UserInterestKeyword[] = keywords.map((curr) => {
          const alreadyExists = oldKeywords.find((v) => v);
          if (alreadyExists) {
            return {
              value: curr,
              score: alreadyExists.score + 1,
            };
          } else {
            return {
              value: curr,
              score: 1,
            };
          }
        });

        const mergedKeywords = [weightedKeywords, oldKeywords]
          .flat()
          .reduce((acc, curr) => {
            const alreadyExists = acc.find((v) => v.value === curr.value);
            if (alreadyExists) return acc;
            return [...acc, curr];
          }, [] as UserInterestKeyword[]);

        await this.prisma.userInterest.update({
          where: {
            userId,
          },
          data: {
            keywords: {
              set: mergedKeywords,
            },
          },
        });
      }
    }
  }

  @MessagePattern(KAFKA_MESSAGES.ANALYTICS_MESSAGES.getUserInterestsKeywords())
  async handleGetUserInterests(
    @Payload() { value }: { value: GetUserInterestsScoresMessage },
  ): Promise<GetUserInterestsScoresMessageReply> {
    const userId = value?.input?.userId;

    if (userId) {
      const interests = await this.prisma.userInterest.findUnique({
        where: {
          userId,
        },
      });

      return new GetUserInterestsScoresMessageReply({
        data: {
          keywords: interests.keywords,
          userId,
        },
        error: null,
        success: true,
      });
    }

    return new GetUserInterestsScoresMessageReply({
      data: null,
      error: new Error('error getting user interests'),
      success: false,
    });
  }
}
