import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductReview } from '@product-review/entities';
import { GetProductReviewQuery } from '@product-review/queries/impl';
import { ProductReviewRepository } from '@product-review/repository';

@QueryHandler(GetProductReviewQuery)
export class GetProductReviewQueryHandler
  implements IQueryHandler<GetProductReviewQuery>
{
  constructor(private readonly repo: ProductReviewRepository) {}

  async execute({ reviewId }: GetProductReviewQuery): Promise<ProductReview> {
    const res = await this.repo.getOneById(reviewId);

    return res;
  }
}
