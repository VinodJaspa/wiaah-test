import { Field, ID, InputType } from '@nestjs/graphql';
import { GqlCursorPaginationInput, GqlPaginationInput } from 'nest-utils';

@InputType()
export class GetUserServicesPostsInput {
  @Field(() => ID)
  userId: string;

  @Field(() => GqlCursorPaginationInput)
  pagination: GqlCursorPaginationInput;
}
