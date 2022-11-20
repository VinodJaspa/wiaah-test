import { ProductRating } from '@prisma-client';

export class ProductRatingCreatedEvent {
  constructor(public readonly rating: ProductRating) {}
}
