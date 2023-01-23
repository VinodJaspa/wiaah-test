import { Field, InputType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
export class GetTopHashtagsInput {
  @Field(() => String, { nullable: true })
  q?: string;

  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
