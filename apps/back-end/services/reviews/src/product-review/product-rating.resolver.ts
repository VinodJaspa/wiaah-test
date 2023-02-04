import { QueryBus } from '@nestjs/cqrs';
import { Resolver, ResolveReference } from '@nestjs/graphql';
import { ProductRating } from '@product-review/entities';
import { GetProductRatingQuery } from '@product-review/queries';

@Resolver(() => ProductRating)
export class ProductRatingResolver {
  constructor(private readonly querybus: QueryBus) {}

  @ResolveReference()
  reslove(ref: { __typename: string; id: string }) {
    return this.querybus.execute<GetProductRatingQuery>(
      new GetProductRatingQuery(ref.id),
    );
  }
}
