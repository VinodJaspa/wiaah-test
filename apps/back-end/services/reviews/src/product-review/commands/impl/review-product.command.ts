import { CreateProductReviewInput } from '@product-review/dto';

export class ReviewProductCommand {
  constructor(
    public readonly input: CreateProductReviewInput,
    public readonly userId: string,
  ) {}
}
