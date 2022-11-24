import { Field, ID, InputType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
export class GetUserActionsInput {
  @Field(() => ID)
  userId: string;

  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
