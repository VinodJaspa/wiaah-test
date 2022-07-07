import { Field, InputType } from '@nestjs/graphql';
import { VoucherStatus } from '@prisma-client';

@InputType()
export class GetVouchersInput {
  @Field((type) => VoucherStatus, { nullable: true })
  status?: VoucherStatus;
}
