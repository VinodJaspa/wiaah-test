import { CreateBillingAddressInput } from './create-billing-address.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateBillingAddressInput extends PartialType(
  CreateBillingAddressInput,
) {
  @Field(() => ID)
  id: string;
}
