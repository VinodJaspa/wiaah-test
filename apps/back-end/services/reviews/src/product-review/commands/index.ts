export * from './impl';
import {
  DeleteProductReviewCommandHandler,
  ReviewProductCommandHandler,
  UpdateProductRatingCommandHandler,
  CreateProductRatingCommandHandler,
} from './handlers';

export const ProductReviewCommandHanders = [
  DeleteProductReviewCommandHandler,
  ReviewProductCommandHandler,
  UpdateProductRatingCommandHandler,
  CreateProductRatingCommandHandler,
];
