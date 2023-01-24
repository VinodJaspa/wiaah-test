import { Field, InputType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
export class GetRecommendedAffiliationPostsInput {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
