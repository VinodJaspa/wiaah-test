import { Field, InputType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
export class GetMyAffiliationsInput {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
