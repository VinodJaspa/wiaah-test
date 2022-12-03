import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GetDateDiff, KAFKA_EVENTS } from 'nest-utils';
import { PrismaService } from 'prismaService';
import {
  ProductPurchasedEvent,
  ContentReactedEvent,
  CommentCreatedEvent,
  NewPostCreatedEvent,
  StoryCreatedEvent,
  UserConnectedEvent,
  UserDisconnectedEvent,
  ServicePurchasedEvent,
} from 'nest-dto';
import {
  USER_ACTIVITY_DAILY_DECREMENT_AMOUNT,
  USER_ACTIVITY_SCORES,
} from '@user-activity-stats/const';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  IncreaseUserActiveTimeCommand,
  IncreaseUserActivityScoreCommand,
  UpdateUserLastActiveCommand,
} from '@user-activity-stats/commands';
import { GetUserActivityStatsQuery } from './queries';
import { UserActivityStats } from './entities';

@Controller()
export class UserActivityStatsController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly commandbus: CommandBus,
    private readonly querybus: QueryBus,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  handleDecreaseActivity() {
    this.prisma.userActivityStats.updateMany({
      data: {
        day_active_min: 0,
      },
    });
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

  // TODO: handle get user activity message

  @EventPattern(KAFKA_EVENTS.PRODUCTS_EVENTS.productPurchased)
  handleProductPurchased(
    @Payload() { value }: { value: ProductPurchasedEvent },
  ) {
    const userId = value.input.purchaserId;
    this.commandbus.execute(
      new IncreaseUserActivityScoreCommand(
        userId,
        USER_ACTIVITY_SCORES.productPurchase,
      ),
    );
  }

  @EventPattern(KAFKA_EVENTS.NEWSFEED_POST_EVENTS.postCreated)
  handlePostCreated(@Payload() { value }: { value: NewPostCreatedEvent }) {
    const userId = value.input.authorId;

    this.commandbus.execute(
      new IncreaseUserActivityScoreCommand(
        userId,
        USER_ACTIVITY_SCORES.newsfeedPost,
      ),
    );
  }

  @EventPattern(KAFKA_EVENTS.REACTION_EVENTS.contentReacted('*'))
  handleContentReacted(@Payload() { value }: { value: ContentReactedEvent }) {
    const userId = value.input.reacterUserId;
    this.commandbus.execute(
      new IncreaseUserActivityScoreCommand(
        userId,
        USER_ACTIVITY_SCORES.contentLike,
      ),
    );
  }

  @EventPattern(KAFKA_EVENTS.COMMENTS_EVENTS.commentCreated('*'))
  handleCommentCreated(@Payload() { value }: { value: CommentCreatedEvent }) {
    const userId = value.input.commentedByUserId;
    this.commandbus.execute(
      new IncreaseUserActivityScoreCommand(
        userId,
        USER_ACTIVITY_SCORES.contentComment,
      ),
    );
  }

  @EventPattern(KAFKA_EVENTS.SERVICES.servicePurchased(`*`))
  handleServiceBooked(@Payload() { value }: { value: ServicePurchasedEvent }) {
    const userId = value.input.purchaserId;
    this.commandbus.execute(
      new IncreaseUserActivityScoreCommand(
        userId,
        USER_ACTIVITY_SCORES.serviceBook,
      ),
    );
  }

  @EventPattern(KAFKA_EVENTS.STORIES.storyCreated)
  handleCreatedStory(@Payload() { value }: { value: StoryCreatedEvent }) {
    const userId = value.input.userId;
    this.commandbus.execute(
      new IncreaseUserActivityScoreCommand(
        userId,
        USER_ACTIVITY_SCORES.storyCreation,
      ),
    );
  }

  @EventPattern(KAFKA_EVENTS.USER_EVENTS.userConnected)
  handleUserConnected(@Payload() { value }: { value: UserConnectedEvent }) {
    const userId = value.input.userId;
    this.commandbus.execute(new UpdateUserLastActiveCommand(userId));
  }

  @EventPattern(KAFKA_EVENTS.USER_EVENTS.updateUserActiveTime)
  @EventPattern(KAFKA_EVENTS.USER_EVENTS.userDisconnected)
  async handleUserDisconnected(
    @Payload() { value }: { value: UserDisconnectedEvent },
  ) {
    const userId = value.input.userId;
    const res = await this.querybus.execute<
      GetUserActivityStatsQuery,
      UserActivityStats
    >(new GetUserActivityStatsQuery(userId));
    const lastActive = res.lastActive;
    const { minutes } = GetDateDiff(new Date(lastActive), new Date());

    this.commandbus.execute(new IncreaseUserActiveTimeCommand(userId, minutes));
  }
}
