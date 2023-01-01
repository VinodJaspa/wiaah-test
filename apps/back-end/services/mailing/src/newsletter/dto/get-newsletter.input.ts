import { Field, InputType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
export class GetFilteredNewsletterInput {
  @Field(() => String)
  email: string;

  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
