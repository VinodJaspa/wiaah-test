import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class VehicleProperties {
  @Field(() => Int)
  seats: number;

  @Field(() => Int)
  windows: number;

  @Field(() => Int)
  maxSpeedInKm: number;

  @Field(() => Int)
  lugaggeCapacity: number;

  @Field(() => Boolean)
  gpsAvailable: boolean;

  @Field(() => Boolean)
  airCondition: boolean;
}
