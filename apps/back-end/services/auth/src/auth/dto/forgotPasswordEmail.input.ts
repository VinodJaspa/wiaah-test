import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ForgotPasswordEmailInput {
  @Field((type) => String)
  email: string;
}
