import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
class input {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  accounts: number;
}

@InputType()
export class AdminGetProfessionInput extends PartialType(input) {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
