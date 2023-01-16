import { Field, InputType, Int } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
export class GetFilteredCategory {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Int, { nullable: true })
  sortOrder?: number;
}
