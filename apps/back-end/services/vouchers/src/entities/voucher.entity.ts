import {
  Field,
  Float,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { VoucherStatus } from '@prisma-client';

// registerEnumType(VoucherType, { name: 'VoucherType' });
registerEnumType(VoucherStatus, { name: 'VoucherStatus' });

@ObjectType()
export class Voucher {
  @Field(() => ID)
  ownerId: string;

  @Field(() => ID)
  id: string;

  @Field((type) => String)
  code: string;

  @Field((type) => VoucherStatus)
  status: VoucherStatus;

  @Field((type) => Float)
  amount: number;

  // @Field((type) => VoucherType)
  // type: VoucherType;

  @Field(() => String)
  createdAt?: Date;

  @Field((type) => String)
  currency: string;
}
