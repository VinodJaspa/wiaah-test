import { Field, InputType, PartialType } from '@nestjs/graphql';
import { AccountDeletionRequestStatus } from '@prisma-client';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
export class Input {
  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => AccountDeletionRequestStatus)
  status: AccountDeletionRequestStatus;

  @Field(() => String)
  dateAdded: string;
}

@InputType()
export class GetAccountDeletionRequestsInput extends PartialType(Input) {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
