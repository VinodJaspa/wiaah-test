import { Field, ID, InputType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
export class GetUserAffiliationsInput {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;

  @Field(() => ID)
  userId: string;
}

@InputType()
export class GetUserAffiliationsPurchasesInput {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;

  @Field(() => ID)
  id: string;
}
