import { Field, InputType, PartialType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
class input {
  @Field(() => String)
  email: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  CRN: string;

  @Field(() => String)
  dateCreated: string;
}

@InputType()
export class GetAdminPendingSellersInput extends PartialType(input) {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
