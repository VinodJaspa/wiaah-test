import { Field, InputType } from '@nestjs/graphql';
import { ExtendableGqlPaginationInput } from 'nest-utils';

@InputType()
export class GetSellerTopSellingProductsInput extends ExtendableGqlPaginationInput {
  @Field(() => String)
  sellerId: string;
}
