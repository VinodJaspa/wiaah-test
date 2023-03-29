import { Field, Float, ID, InputType, Int, PartialType } from '@nestjs/graphql';
import { RefundStatusType } from '@prisma-client';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
export class input {
  @Field(() => String)
  refundId: string;

  @Field(() => String)
  orderId: string;

  @Field(() => String)
  comment: string;

  @Field(() => String)
  product: string;

  @Field(() => RefundStatusType)
  status: RefundStatusType;

  @Field(() => String)
  addedDate: string;

  @Field(() => String)
  dateModified: string;

  @Field(() => String)
  seller: string;

  @Field(() => String)
  buyer: string;
}

@InputType()
export class GetFilteredRefundsInput extends PartialType(input) {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
