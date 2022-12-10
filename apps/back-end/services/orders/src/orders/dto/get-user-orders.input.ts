import { Field, InputType } from '@nestjs/graphql';
import { OrderStatusEnum } from '@prisma-client';
import { AccountType, GqlPaginationInput } from 'nest-utils';

@InputType()
export class GetUserOrders {
  @Field(() => String)
  q: string;

  @Field((type) => OrderStatusEnum, { nullable: true })
  status?: OrderStatusEnum;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  accountType: AccountType;

  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
