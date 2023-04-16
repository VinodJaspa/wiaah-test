import { Field, InputType } from '@nestjs/graphql';
import { GqlCursorPaginationInput, GqlPaginationInput } from 'nest-utils';

@InputType()
export class GetAddableHashtagsInput {
  @Field(() => GqlCursorPaginationInput)
  pagination: GqlCursorPaginationInput;

  @Field(() => String, { nullable: true })
  q?: string;
}
