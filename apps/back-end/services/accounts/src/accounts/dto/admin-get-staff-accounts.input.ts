import {
  Field,
  InputType,
  PartialType,
  registerEnumType,
} from '@nestjs/graphql';
import { AccountStatus } from '@prisma-client';
import { accountType, GqlPaginationInput } from 'nest-utils';

export enum StaffAccountType {
  admin = accountType.ADMIN,
  moderator = accountType.MOD,
}

registerEnumType(StaffAccountType, { name: 'StaffAccountType' });

@InputType()
class input {
  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => StaffAccountType)
  role: StaffAccountType;

  @Field(() => AccountStatus)
  status: AccountStatus;

  @Field(() => String)
  lastActivity: string;
}

@InputType()
export class AdminGetStaffAccountsInput extends PartialType(input) {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
