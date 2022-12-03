import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { ProductReview } from '@product-review/entities';
import { GetProductReviewQuery } from '@product-review/queries';
import { ProductReviewRepository } from '@product-review/repository';
import { DeleteProductReviewCommand } from '@product-review/commands/impl';
import { UnauthorizedException } from '@nestjs/common';
import { ProductReviewDeletedEvent } from '@product-review/events';

@CommandHandler(DeleteProductReviewCommand)
export class DeleteProductReviewCommandHandler
  implements ICommandHandler<DeleteProductReviewCommand>
{
  constructor(
    private readonly repo: ProductReviewRepository,
    private readonly querybus: QueryBus,
    private readonly eventbus: EventBus,
  ) {}

  async execute({
    reviewId,
    userId,
  }: DeleteProductReviewCommand): Promise<ProductReview> {
    const review = await this.querybus.execute<
      GetProductReviewQuery,
      ProductReview
    >(new GetProductReviewQuery(reviewId));

    if (review.reviewerId !== userId) throw new UnauthorizedException();

    const res = await this.repo.delete(reviewId);
    this.eventbus.publish(new ProductReviewDeletedEvent(res));
    return res;
  }
}
