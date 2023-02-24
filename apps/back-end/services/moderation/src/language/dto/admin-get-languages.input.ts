import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
class input {
  @Field(() => String)
  name: string;
  @Field(() => String)
  code: string;

  @Field(() => String)
  locale: string;

  @Field(() => Int)
  sortOrder: number;
}

@InputType()
export class AdminGetLanguagesInput extends PartialType(input) {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
