import { Field, ID, InputType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
export class GetMyNewsfeedPostsInput {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
