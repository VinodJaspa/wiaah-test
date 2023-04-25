import { Field, ID, InputType } from '@nestjs/graphql';
import { GqlCursorPaginationInput } from 'nest-utils';

@InputType()
export class GetUserActionsInput extends GqlCursorPaginationInput {
  @Field(() => ID)
  userId: string;
}
