import { Field, ID, InputType } from '@nestjs/graphql';
import { VoucherStatus } from '@prisma-client';
import { GetVouchersInput } from './get-vouchers.input';

@InputType()
export class GetVouchersByShopIdInput extends GetVouchersInput {
  @Field((type) => ID)
  shopId: string;
}
