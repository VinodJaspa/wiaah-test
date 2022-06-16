import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class CreateRegisterationDto {
  @Field((type) => String)
  @IsString()
  firstName: string;

  @Field((type) => String)
  @IsString()
  lastName: string;

  @Field((type) => String)
  @IsEmail()
  email: string;

  @Field((type) => String)
  @IsString()
  password: string;

  @Field((type) => String)
  @IsString()
  confirmPassword: string;
}
