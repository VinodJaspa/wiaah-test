import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { AccountStatus } from '@prisma-client';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
export class GetFilteredSellersAccountsInput {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => Int, { nullable: true })
  products?: number;

  @Field(() => Int, { nullable: true })
  sales?: number;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => AccountStatus, { nullable: true })
  status?: AccountStatus;

  @Field(() => String, { nullable: true })
  date?: string;

  @Field(() => Float, { nullable: true })
  balance?: number;
}
