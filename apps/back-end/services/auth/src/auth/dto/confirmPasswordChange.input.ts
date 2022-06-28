import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ConfirmPasswordChangeInput {
  @Field((type) => String)
  email: string;
  @Field((type) => String)
  verificationCode: string;
  @Field((type) => String)
  newPassword: string;
  @Field((type) => String)
  confirmNewPassword: string;
}
