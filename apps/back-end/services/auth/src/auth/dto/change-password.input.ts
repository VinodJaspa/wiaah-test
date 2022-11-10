import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChangePasswordInput {
  @Field(() => String)
  currentPassword: string;

  @Field(() => String)
  newPassword: string;

  @Field(() => String)
  confirmNewPassword: string;
}
