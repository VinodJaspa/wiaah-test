import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class HotelAvailablity {
  @Field(() => [String])
  bookedDates: Date[];
}
