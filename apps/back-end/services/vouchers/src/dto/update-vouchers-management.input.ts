import { CreateVouchersManagementInput } from './create-vouchers-management.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVouchersManagementInput extends PartialType(
  CreateVouchersManagementInput,
) {
  @Field(() => Int)
  id: number;
}
