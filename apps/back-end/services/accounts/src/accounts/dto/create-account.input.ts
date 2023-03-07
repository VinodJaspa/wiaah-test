import {
  InputType,
  Field,
  registerEnumType,
  PartialType,
  ID,
} from '@nestjs/graphql';
import { AccountType } from '@prisma-client';
import { StaffAccountType } from './admin-get-staff-accounts.input';

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

  @Field(() => String)
  birthDate: string;
}

@InputType()
export class AdminCreateAdminAccountInput {
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  confirmPassword: string;

  @Field(() => String)
  photo: string;

  @Field(() => StaffAccountType)
  type: StaffAccountType;

  @Field(() => String)
  birthDate: string;
}
@InputType()
export class AdminUpdateAdminAccountInput extends PartialType(
  AdminCreateAdminAccountInput,
) {
  @Field(() => ID)
  id: string;
}

@InputType()
export class AdminCreateAdminAccountInput {
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  confirmPassword: string;

  @Field(() => String)
  photo: string;

  @Field(() => StaffAccountType)
  type: StaffAccountType;
}
@InputType()
export class AdminUpdateAdminAccountInput extends PartialType(
  AdminCreateAdminAccountInput,
) {
  @Field(() => ID)
  id: string;
}

@InputType()
export class CreateSellerAccountInput extends CreateAccountInput {
  @Field(() => String)
  companyRegisterationNumber: string;
}
