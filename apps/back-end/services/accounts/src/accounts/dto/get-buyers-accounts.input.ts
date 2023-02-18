import {
  Field,
  Float,
  InputType,
  Int,
  registerEnumType,
} from '@nestjs/graphql';
import { AccountStatus } from '@prisma-client';
import { GqlPaginationInput } from 'nest-utils';

registerEnumType(AccountStatus, { name: 'AccountStatus' });

@InputType()
export class GetBuyersAccountsInput {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => AccountStatus, { nullable: true })
  status?: AccountStatus;

  @Field(() => String, { nullable: true })
  date?: string;

  @Field(() => Float, { nullable: true })
  balance?: number;

  @Field(() => Int, { nullable: true })
  visits?: number;

  @Field(() => String, { nullable: true })
  ip?: string;
}
