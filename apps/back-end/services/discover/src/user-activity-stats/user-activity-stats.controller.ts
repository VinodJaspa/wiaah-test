import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';
import { KAFKA_EVENTS } from 'nest-utils';
import { PrismaService } from 'prismaService';
import {
  ProductPurchasedEvent,
  ContentReactedEvent,
  CommentCreatedEvent,
} from 'nest-dto';
import {
  USER_ACTIVITY_DAILY_DECREMENT_AMOUNT,
  USER_ACTIVITY_SCORES,
} from '@user-activity-stats/const';

@Controller()
export class UserActivityStatsController {
  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  handleDecreaseActivity() {
    console.log('updating', new Date().toString());
    this.prisma.userActivityStats.updateMany({
      data: {
        activityScore: {
          decrement: USER_ACTIVITY_DAILY_DECREMENT_AMOUNT,
        },
      },

      where: {
        activityScore: {
          gte: USER_ACTIVITY_DAILY_DECREMENT_AMOUNT,
        },
      },
    });
  }

  @EventPattern(KAFKA_EVENTS.PRODUCTS_EVENTS.productPurchased)
  handleProductPurchased(
    @Payload() { value }: { value: ProductPurchasedEvent },
  ) {
    const userId = value.input.purchaserId;
    this.prisma.userActivityStats.update({
      where: {
        id: userId,
      },
      data: {
        activityScore: {
          increment: USER_ACTIVITY_SCORES.productPurchase,
        },
      },
    });
  }

  @EventPattern(KAFKA_EVENTS.NEWSFEED_POST_EVENTS.postCreated)
  handlePostCreated(@Payload() { value }: { value: any }) {}

  @EventPattern(KAFKA_EVENTS.REACTION_EVENTS.contentReacted('*'))
  handleContentReacted(@Payload() { value }: { value: ContentReactedEvent }) {
    const userId = value.input.reacterUserId;
    this.prisma.userActivityStats.update({
      where: {
        id: userId,
      },
      data: {
        activityScore: {
          increment: USER_ACTIVITY_SCORES.contentLike,
        },
      },
    });
  }

  @EventPattern(KAFKA_EVENTS.COMMENTS_EVENTS.commentCreated('*'))
  handleCommentCreated(@Payload() { value }: { value: CommentCreatedEvent }) {
    const userId = value.input.commentedByUserId;
    this.prisma.userActivityStats.update({
      where: {
        id: userId,
      },
      data: {
        activityScore: {
          increment: USER_ACTIVITY_SCORES.contentComment,
        },
      },
    });
  }
}
