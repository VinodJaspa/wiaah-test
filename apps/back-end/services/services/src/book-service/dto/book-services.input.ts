import {
  InputType,
  Int,
  Field,
  ID,
  PartialType,
  IntersectionType,
} from '@nestjs/graphql';

@InputType()
class required {
  @Field(() => ID)
  serviceId: string;

  @Field(() => Date)
  checkin: Date;

  @Field(() => Int)
  guests: number;

  @Field(() => ID)
  cancelationPolicyId: string;
}

@InputType()
class optional {
  @Field(() => Date)
  checkout: Date;

  @Field(() => ID)
  roomId: string;

  @Field(() => [ID])
  extrasIds: string[];

  @Field(() => [ID])
  treatmentsIds: string[];

  @Field(() => ID)
  doctorId: string;

  @Field(() => Int)
  duration: number;

  @Field(() => [ID])
  dishsIds: string[];

  @Field(() => String)
  vehicleId: string;
}

@InputType()
export class BookServiceInput extends IntersectionType(optional, required) {}
