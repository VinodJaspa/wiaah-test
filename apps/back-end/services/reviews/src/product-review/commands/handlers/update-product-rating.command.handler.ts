import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { UpdateProductRatingCommand } from '@product-review/commands/impl';
import { MAX_REVIEW_RATING } from '@product-review/const';
import { ProductRating } from '@product-review/entities';
import { GetProductRatingQuery } from '@product-review/queries';
import { ProductRatingRepository } from '@product-review/repository';

@CommandHandler(UpdateProductRatingCommand)
export class UpdateProductRatingCommandHandler
  implements ICommandHandler<UpdateProductRatingCommand>
{
  constructor(
    private readonly repo: ProductRatingRepository,
    private readonly querybus: QueryBus,
  ) {}

  async execute({
    rate,
    productId,
    type,
  }: UpdateProductRatingCommand): Promise<ProductRating> {
    const productRating = await this.querybus.execute<
      GetProductRatingQuery,
      ProductRating
    >(new GetProductRatingQuery(productId));

    if (!productRating) throw new BadRequestException('product not found');

    const reviewsNum =
      type === 'inc' ? productRating.reviews + 1 : productRating.reviews - 1;

    const reviewStars =
      type === 'inc'
        ? productRating.givenStars + rate
        : productRating.givenStars - rate;

    const fullMark = reviewsNum * MAX_REVIEW_RATING;
    const givenStars = reviewStars;
    const newRating =
      givenStars <= 0 ? 0 : (givenStars / fullMark) * MAX_REVIEW_RATING;

    const res = await this.repo.update(productId, {
      reviews:
        type === 'inc'
          ? {
              increment: 1,
            }
          : {
              decrement: 1,
            },
      givenStars:
        type === 'inc'
          ? {
              increment: rate,
            }
          : {
              decrement: rate,
            },
      rating: newRating,
    });

    return res;
  }
}
