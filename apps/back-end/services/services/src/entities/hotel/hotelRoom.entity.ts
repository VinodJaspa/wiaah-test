import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { ServiceDailyPrices } from '@entities';
import {
  ServiceDiscount,
  ServiceAmenity,
  ServiceCancelationPolicy,
  ServiceExtra,
  ServicePropertyMeasurements,
} from '@entities';
import { Hotel } from './hotel.entity';

@ObjectType()
@Directive('@key(fields:"id")')
export class HotelRoom {
  @Field(() => ID)
  id: string;

  @Field(() => Hotel, { nullable: true })
  hotel?: Hotel;

  @Field(() => ID)
  hotelId: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Int)
  pricePerNight: number;

  @Field(() => Boolean)
  dailyPrice: boolean;

  @Field(() => ServiceDailyPrices, { nullable: true })
  dailyPrices?: ServiceDailyPrices;

  @Field(() => ServiceDiscount)
  discount: ServiceDiscount;

  @Field(() => [String], { nullable: true })
  includedServices: string[];

  @Field(() => [ServiceAmenity], { nullable: true })
  popularAmenities: ServiceAmenity[];

  @Field(() => [ServiceCancelationPolicy])
  cancelationPolicies: ServiceCancelationPolicy[];

  @Field(() => [ServiceExtra], { nullable: true })
  extras: ServiceExtra[];

  @Field(() => [String], { nullable: true })
  includedAmenities: string[];

  @Field(() => Int)
  beds: number;

  @Field(() => Int)
  bathrooms: number;

  @Field(() => Int)
  num_of_rooms: number;

  @Field(() => ServicePropertyMeasurements)
  measurements: ServicePropertyMeasurements;
}
