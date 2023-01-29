import { Field, InputType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
export class GetMySavedPostsInput {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
