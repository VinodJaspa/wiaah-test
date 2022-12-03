import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeactivateVoucherInput {
  @Field((type) => String)
  code: string;
}
