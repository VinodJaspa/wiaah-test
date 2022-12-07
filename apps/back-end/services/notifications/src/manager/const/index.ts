import { NotificationType } from 'prismaClient';

export const ContentType = {
  newsfeed_post: 'newsfeed-post',
  product_post: 'product-post',
  service_post: 'service-post',
  affiliation_post: 'affilation-post',
  cashback: 'cashback',
};

export const NotificationTypes: Record<NotificationType, NotificationType> = {
  followRequest: 'followRequest',
  follow: 'follow',
  storyReacted: 'storyReacted',
  DmMessage: 'DmMessage',
  ShopPromotion: 'ShopPromotion',
  postReacted: 'postReacted',
  postCommented: 'postCommented',
  commentReacted: 'commentReacted',
  commentCommented: 'commentCommented',
  postMention: 'postMention',
  commentMention: 'commentMention',
  info: 'info',
  warning: 'warning',
};
