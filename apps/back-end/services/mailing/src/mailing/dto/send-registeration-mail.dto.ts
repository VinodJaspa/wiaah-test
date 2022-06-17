import { IsString, IsEmail, Length } from 'class-validator';

export class SendVerificationMailDto {
  @IsString()
  @Length(6)
  verificationToken: string;

  @IsEmail()
  email: string;
}
