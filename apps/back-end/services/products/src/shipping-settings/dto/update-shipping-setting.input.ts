import { CreateShippingSettingInput } from './create-shipping-setting.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateShippingSettingInput extends PartialType(
  CreateShippingSettingInput,
) {
  @Field(() => Int)
  id: number;
}
