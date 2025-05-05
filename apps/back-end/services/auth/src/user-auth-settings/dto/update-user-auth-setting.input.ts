import { CreateUserAuthSettingInput } from './create-user-auth-setting.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserAuthSettingInput extends PartialType(
  CreateUserAuthSettingInput,
) {
  @Field(() => Int)
  id: number;
}
