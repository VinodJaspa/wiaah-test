import { Field, Float, InputType, Int, PartialType } from '@nestjs/graphql';
import { VoucherStatus } from '@prisma-client';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
class input {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  voucherNumber: number;

  @Field(() => String)
  currency: string;

  @Field(() => Float)
  price: number;

  @Field(() => String)
  date: string;

  @Field(() => VoucherStatus)
  status: VoucherStatus;
}

@InputType()
export class GetFilteredVouchers extends PartialType(input) {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
