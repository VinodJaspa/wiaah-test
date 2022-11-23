export * from './impl';
import {
  GetProductRatingQueryHandler,
  GetProductReviewQueryHandler,
  GetProductSellerIdQueryHandler,
  GetUserProductReviewQueryHandler,
  GetIsUserHavePurchasedProductQueryHandler,
} from './handlers';

export const ProductReviewsQueryHandlers = [
  GetProductRatingQueryHandler,
  GetProductReviewQueryHandler,
  GetProductSellerIdQueryHandler,
  GetUserProductReviewQueryHandler,
  GetIsUserHavePurchasedProductQueryHandler,
];
