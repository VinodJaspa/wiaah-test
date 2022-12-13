import { Field, Float, ID, InputType, PartialType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

class input {
  @Field(() => String)
  seller: string;

  @Field(() => String)
  purchaser: string;

  @Field(() => Float)
  price: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  affiliator: string;

  @Field(() => Float)
  commission: number;

  @Field(() => Float)
  money_generated: number;

  @Field(() => String)
  purchasedBefore: string;

  @Field(() => String)
  purchasedAfter: string;

  @Field(() => String)
  affiliation_link: string;
}

@InputType()
export class GetFilteredAffiliationHistoryInput extends PartialType(input) {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
