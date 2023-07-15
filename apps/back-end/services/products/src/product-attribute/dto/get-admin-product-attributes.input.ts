import { Field, InputType } from '@nestjs/graphql';
import { ExtendableGqlPaginationInput, GqlPaginationInput } from 'nest-utils';

@InputType()
export class GetAdminProductAttributesPaginationInput extends ExtendableGqlPaginationInput {
  @Field(() => String)
  name: string;
}
