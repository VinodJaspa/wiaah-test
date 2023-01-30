import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
export class GetAffiliationHistoryInput {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
