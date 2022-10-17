import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { ServiceDailyPrices } from '@entities';
import {
  ServiceDiscount,
  ServiceAmenity,
  ServiceCancelationPolicy,
  ServiceExtra,
  ServicePropertyMeasurements,
} from '@entities';
import { HotelServiceEntity } from './hotel.entity';

@ObjectType()
export class HotelRoom {
  @Field(() => ID)
  id: string;

  @Field(() => HotelServiceEntity, { nullable: true })
  hotel?: HotelServiceEntity;

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

  @Field(() => ServiceDailyPrices)
  dailyPrices: ServiceDailyPrices;

  @Field(() => ServiceDiscount)
  discount: ServiceDiscount;

  @Field(() => [String])
  includedServices: string[];

  @Field(() => [ServiceAmenity])
  popularAmenities: ServiceAmenity[];

  @Field(() => [ServiceCancelationPolicy])
  cancelationPolicices: ServiceCancelationPolicy[];

  @Field(() => [ServiceExtra])
  extras: ServiceExtra[];

  @Field(() => [String])
  includedAmenites: string[];

  @Field(() => Int)
  beds: number;

  @Field(() => Int)
  bathrooms: number;

  @Field(() => Int)
  num_of_rooms: number;

  @Field(() => ServicePropertyMeasurements)
  measurements: ServicePropertyMeasurements;
}
