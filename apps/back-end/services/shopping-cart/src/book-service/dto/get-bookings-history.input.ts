import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { ServiceStatus } from '@prisma-client';
import { GqlPaginationInput } from 'nest-utils';

registerEnumType(ServiceStatus, { name: 'ServiceStatus' });

@InputType()
export class GetBookingsHistoryInput {
  @Field(() => ServiceStatus, { nullable: true })
  status?: ServiceStatus;

  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
