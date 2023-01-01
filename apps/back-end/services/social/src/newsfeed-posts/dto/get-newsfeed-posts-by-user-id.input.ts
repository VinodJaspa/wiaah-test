import { Field, ID, InputType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
export class GetNewsfeedPostsByUserIdInput {
  @Field(() => ID)
  userId: string;

  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
