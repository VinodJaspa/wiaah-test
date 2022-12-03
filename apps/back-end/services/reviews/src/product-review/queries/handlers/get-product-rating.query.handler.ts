import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductRating } from '@product-review/entities';
import { ProductRatingRepository } from '@product-review/repository';
import { GetProductRatingQuery } from '@product-review/queries/impl';

@QueryHandler(GetProductRatingQuery)
export class GetProductRatingQueryHandler
  implements IQueryHandler<GetProductRatingQuery>
{
  constructor(private readonly repo: ProductRatingRepository) {}

  async execute({ productId }: GetProductRatingQuery): Promise<ProductRating> {
    const res = await this.repo.getByProductId(productId);
    console.log({ productId, res });
    return res;
  }
}
