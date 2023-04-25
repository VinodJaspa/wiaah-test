import { NotificationType } from 'prismaClient';

export const ContentType = {
  newsfeed_post: 'newsfeed-post',
  product_post: 'product-post',
  service_post: 'service-post',
  affiliation_post: 'affilation-post',
  cashback: 'cashback',
};

export const NotificationTypes = NotificationType;
