import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ApplyVoucherInput {
  @Field((type) => String)
  voucherCode: string;
}
