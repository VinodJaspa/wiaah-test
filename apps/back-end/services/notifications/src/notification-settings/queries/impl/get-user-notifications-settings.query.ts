import { NotificationSettingsEnum } from 'prismaClient';

export class GetUserNotificationsSettingsQuery {
  constructor(public userId: string) {}
}

export type GetUserNotificationsSettingsQueryRes = {
  id: string;
  postReaction: NotificationSettingsEnum;
  productPosts: NotificationSettingsEnum;
  servicePosts: NotificationSettingsEnum;
  affilaitionPosts: NotificationSettingsEnum;
  actionPosts: NotificationSettingsEnum;
  postComment: NotificationSettingsEnum;
  commentLike: NotificationSettingsEnum;
  mentions: NotificationSettingsEnum;
  nearShopPromotions: boolean;
};
