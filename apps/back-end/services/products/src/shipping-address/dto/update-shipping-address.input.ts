import { CreateShippingAddressInput } from './create-shipping-address.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateShippingAddressInput extends PartialType(
  CreateShippingAddressInput,
) {
  @Field(() => ID)
  id: string;
}
