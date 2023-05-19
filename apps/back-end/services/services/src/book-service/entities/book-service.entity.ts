import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { BookedServiceStatus } from 'prismaClient';
import { GqlCursorPaginationResponse } from 'nest-utils';

@ObjectType()
export class BookedService {
  @Field(() => ID)
  id: string;

  @Field(() => [ID])
  serviceId: string;

  @Field(() => ID)
  ownerId: string;

  @Field(() => String)
  type: string;

  @Field(() => ID)
  providerId: string;

  @Field(() => BookedServiceStatus)
  status: BookedServiceStatus;

  @Field(() => String, { nullable: true })
  payment?: string;

  @Field(() => Date)
  checkin: Date;

  @Field(() => Date, { nullable: true })
  checkout?: Date;

  @Field(() => Int, { nullable: true })
  duration?: number;

  @Field(() => Int)
  guests: number;

  @Field(() => [ID], { nullable: true })
  extrasIds?: string[];

  @Field(() => String, { nullable: true })
  discountId?: string;

  @Field(() => String, { nullable: true })
  cashbackId?: string;

  @Field(() => Int, { nullable: true })
  total?: number;

  @Field(() => Int, { nullable: true })
  originalTotal?: number;
}

@ObjectType()
export class MyBookings extends GqlCursorPaginationResponse {
  @Field(() => [BookedService])
  data: BookedService[];
}
