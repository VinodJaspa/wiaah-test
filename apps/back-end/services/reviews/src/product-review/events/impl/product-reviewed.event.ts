import { ProductReview } from '@prisma-client';

export class ProductReviewedEvent {
  constructor(public readonly review: ProductReview) {}
}
