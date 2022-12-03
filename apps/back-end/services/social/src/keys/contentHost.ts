import { createTypedRecord } from 'nest-utils';
import { ContentHostType } from 'prismaClient';

export const ContentHostTypeEnum = createTypedRecord<ContentHostType>()({
  NEWSFEED_POST: 'post_newsfeed',
  SHOP_POST: 'post_shop',
  COMMENT: 'comment',
});
