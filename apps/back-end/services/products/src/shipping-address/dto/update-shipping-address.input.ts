import { CreateShippingAddressInput } from './create-shipping-address.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateShippingAddressInput extends PartialType(CreateShippingAddressInput) {
  @Field(() => Int)
  id: number;
}
