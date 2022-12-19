import { Field, InputType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
export class GetDesignByPlacementInput {
  @Field(() => String)
  placement: string;

  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
