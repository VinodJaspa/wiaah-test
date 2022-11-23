import { ProductReview } from '@prisma-client';

export class ProductReviewDeletedEvent {
  constructor(public readonly review: ProductReview) {}
}
