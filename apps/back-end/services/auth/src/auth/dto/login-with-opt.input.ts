import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEmail, IsNumberString } from 'class-validator';

@InputType()
export class LoginWithOtpInput {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsNumberString()
  otp: string;
}
