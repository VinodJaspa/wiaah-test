import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { VoucherType } from '@prisma-client';

@InputType()
export class CreateVoucherInput {
  @Field((type) => String)
  code: string;

  @Field((type) => Float)
  amount: number;

  @Field((type) => VoucherType)
  type: VoucherType;

  @Field((type) => String, { nullable: true })
  currency?: string;
}
