import { Field, InputType } from '@nestjs/graphql';
import { ExtendableGqlPaginationInput } from 'nest-utils';

@InputType()
export class GetSellerRecentOrdersInput extends ExtendableGqlPaginationInput {
  @Field(() => String)
  sellerId: string;
}
