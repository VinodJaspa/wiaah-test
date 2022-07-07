import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Voucher } from '@entities';

@ObjectType()
export class VoucherCluster {
  @Field((type) => ID)
  id: string;

  @Field((type) => ID)
  ownerId: string;

  @Field((type) => [Voucher])
  vouchersList: Voucher[];
}
