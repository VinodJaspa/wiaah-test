import { Field, InputType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
export class GetRecommendedServicePostsInput {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;

  @Field(() => String)
  serviceType: string;
}
