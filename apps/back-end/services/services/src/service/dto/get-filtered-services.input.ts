import { Field, InputType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
export class GetFilteredServicesInput {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
