import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteVoucherInput {
  @Field((type) => String)
  voucherCode: string;
}
