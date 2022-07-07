import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ActivateVoucherInput {
  @Field((type) => String)
  code: string;
}
