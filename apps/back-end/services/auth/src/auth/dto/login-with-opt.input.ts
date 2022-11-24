import { Field, Int } from '@nestjs/graphql';
import { IsEmail, IsNumberString } from 'class-validator';

export class LoginWithOtpInput {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsNumberString()
  otp: string;
}
