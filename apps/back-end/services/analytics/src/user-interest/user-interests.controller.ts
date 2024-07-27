import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { UserInterestKeyword } from '@prisma-client';
import {
  ContentReactedEvent,
  GetUserInterestsScoresMessage,
  GetUserInterestsScoresMessageReply,
  ProductPurchasedEvent,
  ServicePurchasedEvent,
} from 'nest-dto';
import { KAFKA_EVENTS, KAFKA_MESSAGES } from 'nest-utils';
import { PrismaService } from 'prismaService';
import {
  GetProductMetadataQuery,
  GetProductMetadataQueryRes,
  GetServiceMetadataQuery,
  GetServiceMetadataQueryRes,
} from './queries/impl';

@Controller()
export class UserInterestsController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly querybus: QueryBus,
  ) { }

  @EventPattern(KAFKA_EVENTS.REACTION_EVENTS.contentReacted('post'))
  async handleSocialContentReaction(
    @Payload() { value }: { value: ContentReactedEvent },
  ) {
    const keywords = value.input.keywords;
    const userId = value.input.reacterUserId;
    this.updateUserKeywords(keywords, userId);
  }

  @EventPattern(KAFKA_EVENTS.PRODUCTS_EVENTS.productPurchased)
  async handleProductPurchased(
    @Payload() { value }: { value: ProductPurchasedEvent },
  ) {
    const product = await this.querybus.execute<
      GetProductMetadataQuery,
      GetProductMetadataQueryRes
    >(
      new GetProductMetadataQuery(
        value.input.productId,
        value.input.purchaserId,
      ),
    );

    const keywords = product.keywords;

    this.updateUserKeywords(keywords, value.input.purchaserId);
  }

  @EventPattern(KAFKA_EVENTS.SERVICES.servicePurchased('hotel', true))
  async handleServicePurchased(
    @Payload() { value }: { value: ServicePurchasedEvent },
  ) {
    const service = await this.querybus.execute<
      GetServiceMetadataQuery,
      GetServiceMetadataQueryRes
    >(
      new GetServiceMetadataQuery(
        value.input.serviceId,
        value.input.purchaserId,
      ),
    );

    const keywords = service.keywords;

    this.updateUserKeywords(keywords, value.input.purchaserId);
  }

  async updateUserKeywords(keywords: string[], userId: string) {
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
