import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
class input {
  @Field(() => String)
  product: string;

  @Field(() => String)
  id: string;

  @Field(() => String)
  buyer: string;

  @Field(() => String)
  seller: String;

  @Field(() => String)
  review: string;

  @Field(() => Int)
  rating: number;

  @Field(() => String)
  dateAdded: string;
}

@InputType()
export class GetAdminFitleredProductReviewsInput extends PartialType(input) {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
