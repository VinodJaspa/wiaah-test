import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductReview } from '@product-review/entities';
import { GetUserProductReviewQuery } from '@product-review/queries/impl';
import { ProductReviewRepository } from '@product-review/repository';

@QueryHandler(GetUserProductReviewQuery)
export class GetUserProductReviewQueryHandler
  implements IQueryHandler<GetUserProductReviewQuery>
{
  constructor(private readonly repo: ProductReviewRepository) {}

  async execute({
    productId,
    userId,
  }: GetUserProductReviewQuery): Promise<ProductReview> {
    const res = await this.repo.getOneByProductAndReviewerIds(
      productId,
      userId,
    );

    return res;
  }
}
