import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { AccountType } from '@prisma-client';

enum RegisterAccountType {
  seller = 'seller',
  buyer = 'buyer',
}

registerEnumType(RegisterAccountType, { name: 'RegisterAccountType' });

@InputType()
export class CreateAccountInput {
  @Field((type) => String)
  firstName: string;

  @Field((type) => String)
  lastName: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  confirmPassword: string;

  @Field(() => RegisterAccountType)
  accountType: RegisterAccountType;
}

@InputType()
export class CreateSellerAccountInput extends CreateAccountInput {
  @Field(() => String)
  companyRegisterationNumber: string;
}
