import { Field, Float, ObjectType, registerEnumType } from '@nestjs/graphql';
import { VoucherType } from '@prisma-client';

registerEnumType(VoucherType, { name: 'VoucherType' });

@ObjectType()
export class Voucher {
  @Field((type) => Float)
  amount: number;

  @Field((type) => VoucherType)
  type: VoucherType;

  @Field((type) => String)
  currency: string;
}
