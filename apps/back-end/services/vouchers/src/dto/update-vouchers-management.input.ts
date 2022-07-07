import { CreateVoucherInput } from '@dto';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVouchersManagementInput extends PartialType(
  CreateVoucherInput,
) {
  @Field(() => Int)
  id: number;
}
