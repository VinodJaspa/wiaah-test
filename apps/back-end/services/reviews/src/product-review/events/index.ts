export * from './impl';
import {
  ProductReviewDeletedEventHandler,
  ProductReviewedEventHandler,
} from './handlers';

export const ProductReviewEventHandlers = [
  ProductReviewDeletedEventHandler,
  ProductReviewedEventHandler,
];
