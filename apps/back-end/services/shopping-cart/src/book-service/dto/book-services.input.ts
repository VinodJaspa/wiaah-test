import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
class BaseBookServiceInput {
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
export class BookHotelRoomInput extends BaseBookServiceInput {
  @Field(() => Date)
  checkout: Date;

  @Field(() => ID)
  roomId: string;

  @Field(() => [ID])
  extrasIds: string[];
}

@InputType()
export class BookRestaurantInput extends BaseBookServiceInput {
  @Field(() => Int)
  duration: number;

  @Field(() => [ID])
  dishsIds: string[];
}

@InputType()
export class BookHealthCenterServiceInput extends BaseBookServiceInput {
  @Field(() => ID)
  doctorId: string;
}

@InputType()
export class BookBeautycenterServiceInput extends BaseBookServiceInput {
  @Field(() => [ID])
  treatmentsIds: string[];
}

@InputType()
export class BookVehicleServiceInput extends BaseBookServiceInput {
  @Field(() => [ID])
  treatmentsIds: string[];
}
