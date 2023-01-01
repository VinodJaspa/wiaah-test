import { Field, ID, InputType, registerEnumType } from '@nestjs/graphql';
import { ServiceStatus } from '@prisma-client';
import { accountType, GqlPaginationInput } from 'nest-utils';

registerEnumType(ServiceStatus, { name: 'ServiceStatus' });

@InputType()
export class GetBookingsHistoryInput {
  @Field(() => ServiceStatus, { nullable: true })
  status?: ServiceStatus;

  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;

  @Field(() => String)
  q: string;
}

@InputType()
export class GetBookingsHistoryAdminInput extends GetBookingsHistoryInput {
  @Field(() => ID)
  userId: string;

  @Field(() => accountType)
  accountType: accountType;
}
