import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { AccountType } from 'nest-dto';

// registerEnumType(AccountType, { name: 'AccountType' });
@InputType()
export class RegisterDto {
  @Field((type) => String)
  firstName: string;

  @Field((type) => String)
  lastName: string;

  @Field((type) => String)
  @IsEmail()
  email: string;

  @Field((type) => String)
  password: string;

  @Field((type) => String)
  confirmPassword: string;

  @Field((type) => String)
  accountType: AccountType;
}
