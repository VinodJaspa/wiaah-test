import { CreateCookiesSettingInput } from './create-cookies-setting.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCookiesSettingInput extends PartialType(CreateCookiesSettingInput) {
  @Field(() => Int)
  id: number;
}
