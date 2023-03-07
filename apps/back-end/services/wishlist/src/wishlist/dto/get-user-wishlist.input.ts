import { Field, InputType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
export class AdminGetUserWishlistInput {
  @Field(() => String)
  accountId: string;

  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
