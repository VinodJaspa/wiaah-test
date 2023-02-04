import { Field, InputType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
export class GetMyReviewsInput {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
