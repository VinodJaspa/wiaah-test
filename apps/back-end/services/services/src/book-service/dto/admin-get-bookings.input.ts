import { Field, Float, InputType, PartialType } from '@nestjs/graphql';
import { BookedServiceStatus } from 'prismaClient';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
export class input {
  @Field(() => String)
  id: string;

  @Field(() => String)
  type: string;

  @Field(() => String)
  seller: string;

  @Field(() => String)
  buyer: string;

  @Field(() => BookedServiceStatus)
  status: BookedServiceStatus;

  @Field(() => Float)
  total: string;

  @Field(() => String)
  dateAdded: string;
}

@InputType()
export class AdminGetBookingsInput extends PartialType(input) {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
