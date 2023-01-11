import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
export enum RegisterAccountType {
  seller = 'seller',
  buyer = 'buyer',
}
registerEnumType(RegisterAccountType, { name: 'RegisterAccountType' });

@InputType()
export class RegisterDto {
  @Field((type) => String)
  firstName: string;

  @Field((type) => String)
  lastName: string;

  @Field((type) => String)
  @IsEmail()
  email: string;

  @Field((type) => RegisterAccountType)
  accountType: RegisterAccountType;
}
