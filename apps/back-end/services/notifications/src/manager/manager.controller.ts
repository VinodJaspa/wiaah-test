import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import {
  AccountSuspendedEvent,
  AccountVerificationRequestAcceptedEvent,
  AccountVerificationRequestRejectedEvent,
  AppointmentRefusedEvent,
  CashbackAddedEvent,
  CommentCreatedEvent,
  CommentMentionedEvent,
  ContentReactedEvent,
  ContentSuspendedEvent,
  LookForNearShopsPromotionsEvent,
  OrderDeliveredEvent,
  OrderRefundRequestRejectedEvent,
  PromotionCreatedEvent,
  SellerAccountRefusedEvent,
  SellerProductsPurchasedEvent,
  ShopNearPromotionsResolvedEvent,
  SocialContentCreatedEvent,
  UserCurrentLocationUpdateEvent,
  WithdrawalProcessedEvent,
} from 'nest-dto';
import { KAFKA_EVENTS } from 'nest-utils';
import { NotifciationBaseController } from '@manager/abstraction';
import {
  GetUserNotificationsSettingsQuery,
  GetUserDataQuery,
  GetUserDataQueryRes,
  GetUserFollowersIdsQuery,
  GetUserFollowersIdsQueryRes,
  GetUserNotificationsSettingsQueryRes,
  GetProductQuery,
  GetProductQueryRes,
  GetCurrencyExchangeQuery,
  GetCurrencyExchangeQueryRes,
} from '@manager/queries';
import { ContentType, NotificationTypes } from '@manager/const';

@Controller()
export class ManagerController extends NotifciationBaseController {
  @EventPattern(KAFKA_EVENTS.COMMENTS_EVENTS.commentCreated)
  handleCommentCreatedEvent(@Payload() data: { value: CommentCreatedEvent }) {
    const {
      commentedByUserId,
      hostType,
      mainHostId,
      commentedByProfileId,
      contentOwnerUserId,
    } = data.value.input;
    this.service.createNotification({
      type: hostType === 'comment' ? 'commentCommented' : 'postCommented',
      authorId: commentedByUserId,
      content: '',
      contentId: mainHostId,
      authorProfileId: commentedByProfileId,
      contentOwnerUserId,
    });
  }

  @EventPattern(KAFKA_EVENTS.COMMENTS_EVENTS.commentMentions)
  handleCommentMentionsEvent(
    @Payload() data: { value: CommentMentionedEvent },
  ) {
    const {
      mentionedIds,
      mentionedByProfileId,
      mainHostId,
      mentionedByUserId,
    } = data.value.input;

    Array.isArray(mentionedIds)
      ? mentionedIds.map((id) => {
          this.service.createNotification({
            content: '',
            type: 'commentMention',
            authorId: mentionedByUserId,
            authorProfileId: mentionedByProfileId,
            contentOwnerUserId: id.userId,
            contentId: mainHostId,
          });
        })
      : null;
  }

  @EventPattern(KAFKA_EVENTS.REACTION_EVENTS.contentReacted('*', true))
  handleContentReactedEvent(@Payload() data: { value: ContentReactedEvent }) {
    const {
      contentAuthorUserId,
      contentId,
      contentTitle,
      contentType,
      reacterProfileId,
      reacterUserId,
    } = data.value.input;

    const postsTypes = ['newsfeed-post'];

    this.service.createNotification({
      content: contentTitle,
      contentId,
      type: postsTypes.includes(contentType) ? 'postReacted' : 'commentReacted',
      authorProfileId: reacterProfileId,
      contentOwnerUserId: contentAuthorUserId,
      authorId: reacterUserId,
    });
  }

  @EventPattern(KAFKA_EVENTS.SOCIAL_EVENTS.contentCreated('*', true))
  async handleSocialContentCreatedEvent(
    @Payload() data: { value: SocialContentCreatedEvent },
  ) {
    const { authorId, id, type } = data.value.input;
    const authorDataPromise = this.querybus.execute(
      new GetUserDataQuery(authorId),
    );
    const followersPromise = this.querybus.execute<
      GetUserFollowersIdsQuery,
      GetUserFollowersIdsQueryRes
    >(new GetUserFollowersIdsQuery(authorId));

    const authorData = await authorDataPromise;
    const followers = await followersPromise;

    let contentTitle: string;

    const postsTypes = ['newsfeed-post'];

    switch (type) {
      case ContentType.newsfeed_post:
        contentTitle = `${authorData.name} has posted a new post`;
        break;
      case ContentType.product_post:
        contentTitle = `${authorData.name} has published a new product`;
        break;
      case ContentType.service_post:
        contentTitle = `${authorData.name} has published a new service`;
        break;
      case ContentType.affiliation_post:
        contentTitle = `${authorData.name} has published a new affilation`;
        break;
      default:
        contentTitle = `${authorData.name} has published a new content`;
        break;
    }

    this.service.createMany(
      followers.map((v) => ({
        content: contentTitle,
        contentId: id,
        type: postsTypes.includes(type)
          ? NotificationTypes.postReacted
          : NotificationTypes.commentReacted,
        authorId,
        isFollowed: true,
        userId: v.id,
      })),
    );
  }

  @EventPattern(KAFKA_EVENTS.CASHBACK_EVENTS.cashbackAdded())
  async handleCashbackAddedNotification(
    @Payload() { value }: { value: CashbackAddedEvent },
  ) {
    const amount = value.input.amount;
    const userId = value.input.userId;

    await this.service.createNotification({
      authorId: userId,
      content: `Congrats, you have won ${amount} cashbacks`,
      type: NotificationTypes.info,
    });
  }

  @EventPattern(KAFKA_EVENTS.PROMOTION_EVENTS.promotionCreated('*', true))
  async handleSnedPromotionShopFollowersNotification(
    @Payload() { value }: { value: PromotionCreatedEvent },
  ) {
    const getSeller = this.querybus.execute<
      GetUserDataQuery,
      GetUserDataQueryRes
    >(new GetUserDataQuery(value.input.sellerId));
    const getFollowers = this.querybus.execute<
      GetUserFollowersIdsQuery,
      GetUserFollowersIdsQueryRes
    >(new GetUserFollowersIdsQuery(value.input.sellerId));
    const seller = await getSeller;
    const followers = await getFollowers;

    this.service.createMany(
      followers.map((v) => ({
        authorId: seller.id,
        userId: v.id,
        type: NotificationTypes.ShopPromotion,
        isFollowed: true,
      })),
    );
  }

  @EventPattern(KAFKA_EVENTS.USER_EVENTS.userCurrLocationChanged('*', true))
  async handleCheckIfWantPromotionNotifications(
    @Payload() { value }: { value: UserCurrentLocationUpdateEvent },
  ) {
    const { id, lat, lon } = value.input;

    const settings = await this.querybus.execute<
      GetUserNotificationsSettingsQuery,
      GetUserNotificationsSettingsQueryRes
    >(new GetUserNotificationsSettingsQuery(id));

    if (settings.nearShopPromotions) {
      this.eventClient.emit(
        KAFKA_EVENTS.PROMOTION_EVENTS.lookForNearShopsPromotions(),
        new LookForNearShopsPromotionsEvent({
          lat,
          lon,
          userId: id,
          userlang: 'en',
        }),
      );
    }
  }

  @EventPattern(KAFKA_EVENTS.PROMOTION_EVENTS.nearUserShopsPromotionsResloved())
  async handlePromotionsResolved(
    @Payload() { value }: { value: ShopNearPromotionsResolvedEvent },
  ) {
    const { shops, userId } = value.input;

    const getSellers = Promise.all(
      shops.map((s) => {
        return this.querybus.execute<GetUserDataQuery, GetUserDataQueryRes>(
          new GetUserDataQuery(s.sellerId),
        );
      }),
    );

    const sellers = await getSellers;

    this.service.createMany(
      sellers.map((v) => ({
        type: NotificationTypes.ShopPromotion,
        userId,
        authorId: v.id,
      })),
    );
  }

  @EventPattern(KAFKA_EVENTS.SERVICES.appointmentRefused('*'))
  async handleAppointmentRefused(
    @Payload() { value }: { value: AppointmentRefusedEvent },
  ) {
    this.service.createNotification({
      authorId: value.input.sellerId,
      contentOwnerUserId: value.input.buyerId,
      type: NotificationTypes.warning,
      content: `Your appointment was refused reason:${value.input.reason}`,
    });
  }

  @EventPattern(KAFKA_EVENTS.ACCOUNTS_EVENTS.sellerAccountRefused)
  async handleSellerRefused(
    @Payload() { value }: { value: SellerAccountRefusedEvent },
  ) {
    this.service.createNotification({
      contentOwnerUserId: value.input.id,
      type: NotificationTypes.warning,
      content: `Your request to open a seller account was refused reason:${value.input.reason}`,
    });
  }

  @EventPattern(KAFKA_EVENTS.BILLING_EVNETS.withdrawalProcessed())
  async handleProcessedWithdrawal(
    @Payload() { value }: { value: WithdrawalProcessedEvent },
  ) {
    this.service.createNotification({
      contentOwnerUserId: value.input.userId,
      type: NotificationTypes.info,
      content: {
        lang: 'en',
        value: `Your withdrawal request of $${value.input.amount} have been processed, and will be in your account within 7 days`,
      },
    });
  }

  @EventPattern(KAFKA_EVENTS.ORDERS_EVENTS.orderRefundRequestRejected())
  async handleRefundRequestRejected(
    @Payload() { value }: { value: OrderRefundRequestRejectedEvent },
  ) {
    const productPromise = this.querybus.execute<
      GetProductQuery,
      GetProductQueryRes
    >(new GetProductQuery(value.input.productId));

    const product = await productPromise;

    this.service.createNotification({
      contentOwnerUserId: value.input.buyerId,
      type: NotificationTypes.warning,
      content: {
        lang: 'en',
        value: `Your request to refund $${product.title} have been reject by the seller. %l%open a dispute%l%`,
      },
    });
  }

  @EventPattern(KAFKA_EVENTS.ORDERS_EVENTS.orderRefundRequestRejected())
  async handleAffiliationUsed(
    @Payload() { value }: { value: SellerProductsPurchasedEvent },
  ) {
    const affiliations = value.input.products.map(({ affiliation, id }) => ({
      userId: affiliation.affiliatorId,
      amount: affiliation.affiliationAmount,
      productId: id,
    }));

    for (const affilaition of affiliations) {
      const productPromise = this.querybus.execute<
        GetProductQuery,
        GetProductQueryRes
      >(new GetProductQuery(affilaition.productId));
      const user = await this.querybus.execute<
        GetUserDataQuery,
        GetUserDataQueryRes
      >(new GetUserDataQuery(value.input.sellerId));
      const res = await this.querybus.execute<
        GetCurrencyExchangeQuery,
        GetCurrencyExchangeQueryRes
      >(new GetCurrencyExchangeQuery(affilaition.amount, user.currency));

      const product = await productPromise;

      this.service.createNotification({
        contentOwnerUserId: value.input.buyerId,
        type: NotificationTypes.info,
        content: {
          lang: 'en',
          value: `Congrats, you have won ${res.symbol || '$'}${
            res.amount || affilaition.amount
          } for affiliating ${product.title}`,
        },
      });
    }
  }

  @EventPattern(KAFKA_EVENTS.MODERATION.contentSuspensed('newsfeed-post'))
  handlePostSuspension(@Payload() { value }: { value: ContentSuspendedEvent }) {
    this.service.createNotification({
      contentOwnerUserId: value.input.authorId,
      type: NotificationTypes.warning,
      content: {
        lang: 'en',
        value: `one of your posts have been reported for inappropriate content and have been removed`,
      },
    });
  }

  @EventPattern(KAFKA_EVENTS.ACCOUNTS_EVENTS.accountSuspended)
  handleAccountSuspension(
    @Payload() { value }: { value: AccountSuspendedEvent },
  ) {
    this.service.createNotification({
      contentOwnerUserId: value.input.id,
      type: NotificationTypes.warning,
      content: {
        lang: 'en',
        value: `your account have been reported for inappropriate content and have been suspended`,
      },
    });
  }

  @EventPattern(KAFKA_EVENTS.ACCOUNTS_EVENTS.accountVerificationRequestRejected)
  handleAccountVerificationRejected(
    @Payload() { value }: { value: AccountVerificationRequestRejectedEvent },
  ) {
    this.service.createNotification({
      contentOwnerUserId: value.input.id,
      type: NotificationTypes.warning,
      content: {
        lang: 'en',
        value: `your account verification request have been rejected reason:${value.input.rejectReason}`,
      },
    });
  }

  @EventPattern(KAFKA_EVENTS.ORDERS_EVENTS.orderDelivered())
  handleRequestFeedback(@Payload() { value }: { value: OrderDeliveredEvent }) {
    this.service.createNotification({
      contentOwnerUserId: value.input.buyerId,
      type: NotificationTypes.info,
      content: {
        lang: 'en',
        value: `share your experince with your latest order by providing a feedback`,
      },
    });
  }
}
