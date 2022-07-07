import { Field, Float, ObjectType, registerEnumType } from '@nestjs/graphql';
import { VoucherStatus } from '@prisma-client';

// registerEnumType(VoucherType, { name: 'VoucherType' });
registerEnumType(VoucherStatus, { name: 'VoucherStatus' });

@ObjectType()
export class Voucher {
  @Field((type) => String)
  code: string;

  @Field((type) => VoucherStatus)
  status: VoucherStatus;

  @Field((type) => Float)
  amount: number;

  // @Field((type) => VoucherType)
  // type: VoucherType;

  @Field((type) => String)
  currency: string;
}
