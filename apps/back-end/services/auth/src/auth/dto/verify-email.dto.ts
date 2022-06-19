import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNumberString, IsString } from 'class-validator';

@InputType()
export class VerifyEmailDto {
  @Field((type) => String)
  @IsEmail()
  email: string;

  @Field((type) => String)
  @IsString()
  verificationCode: string;
}
