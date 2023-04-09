import { Field, ID, InputType, registerEnumType } from '@nestjs/graphql';
import { BookedServiceStatus } from '@prisma-client';
import { accountType, GqlPaginationInput } from 'nest-utils';

registerEnumType(BookedServiceStatus, { name: 'BookedServiceStatus' });
registerEnumType(accountType, { name: 'AccountType' });

@InputType()
export class GetBookingsHistoryInput {
  @Field(() => BookedServiceStatus, { nullable: true })
  status?: BookedServiceStatus;

  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;

  @Field(() => String)
  q: string;
}

@InputType()
export class GetBookingsHistoryAdminInput extends GetBookingsHistoryInput {
  @Field(() => ID)
  userId: string;

  @Field(() => String)
  accountType: accountType;
}
