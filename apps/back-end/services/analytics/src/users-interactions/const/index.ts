export const USER_INTERACTION_SCORE = {
  dailyDecrement: 2,
  postLike: 1,
  postComment: 2,
  mention: 1,
  commentReply: 1,
  commentLike: 1,
  share: 1,
  message: 0.5,
};

export enum ContentTypeEnum {
  comment = 'comment',
  newsfeed_post = 'newsfeed-post',
  product_post = 'product-post',
  service_post = 'service-post',
  affiliation_post = 'affiliation-post',
  action = 'action',
}
