import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { VoucherStatus } from '@prisma-client';

@InputType()
export class GetFilteredVouchers {
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
