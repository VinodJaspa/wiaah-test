import {
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { ReviewProductCommand } from '@product-review/commands/impl';
import { ProductReview } from '@product-review/entities';
import { ProductReviewedEvent } from '@product-review/events';
import {
  GetUserProductReviewQuery,
  GetProductSellerIdQuery,
  GetIsUserHavePurchasedProductQuery,
} from '@product-review/queries';

import { ProductReviewRepository } from '@product-review/repository';

@CommandHandler(ReviewProductCommand)
export class ReviewProductCommandHandler
  implements ICommandHandler<ReviewProductCommand>
{
  constructor(
    private readonly repo: ProductReviewRepository,
    private readonly querybus: QueryBus,
    private readonly eventbus: EventBus,
  ) {}

  async execute({
    input,
    userId,
  }: ReviewProductCommand): Promise<ProductReview> {
    const review = await this.querybus.execute<
      GetUserProductReviewQuery,
      ProductReview
    >(new GetUserProductReviewQuery(input.productId, userId));
    if (review)
      throw new UnprocessableEntityException(
        'this account already reviewed this product',
      );

    const [hasPurchased, product] = await this.querybus.execute<
      GetIsUserHavePurchasedProductQuery,
      [boolean, { id: string; sellerId: string } | null]
    >(new GetIsUserHavePurchasedProductQuery(userId, input.productId));

    if (!hasPurchased || !product)
      throw new UnauthorizedException(
        'you cannot review products you have not purchased',
      );

    const res = await this.repo.create(
      { ...input, sellerId: product.sellerId },
      userId,
    );

    this.eventbus.publish<ProductReviewedEvent>(new ProductReviewedEvent(res));
    return res;
  }
}
