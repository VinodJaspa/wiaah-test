import { CreateAuthOtpInput } from './create-auth-otp.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAuthOtpInput extends PartialType(CreateAuthOtpInput) {
  @Field(() => Int)
  id: number;
}
