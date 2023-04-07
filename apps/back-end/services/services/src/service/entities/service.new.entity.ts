import { BeautyCenterTreatmentCategory } from '@beauty-center';
import {
  ServicePresentation,
  ServiceDailyPrices,
  ServiceDiscount,
  ServiceAmenity,
  ServiceCancelationPolicy,
  ServiceExtra,
  ServicePropertyMeasurements,
} from '@entities';
import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { VehicleProperties } from '@vehicle-service';
import {
  HealthCenterDoctorAvailablityStatus,
  HealthCenterDoctorSpeakingLanguage,
} from 'prismaClient';

@ObjectType()
export class Service {
  // base
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  sellerId: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;

  @Field(() => Int)
  price: number;

  @Field(() => String)
  thumbnail: string;

  @Field(() => Float)
  rating: number;

  @Field(() => Int)
  reviews: number;

  @Field(() => ServiceDiscount)
  discount: ServiceDiscount;

  @Field(() => [ServiceCancelationPolicy])
  cancelationPolicies: ServiceCancelationPolicy[];

  // hotel room
  @Field(() => [ServiceAmenity], { nullable: true })
  popularAmenities: ServiceAmenity[];

  @Field(() => [String], { nullable: true })
  includedServices: string[];

  @Field(() => [ServiceExtra], { nullable: true })
  extras: ServiceExtra[];

  @Field(() => [String], { nullable: true })
  includedAmenities: string[];

  @Field(() => Boolean, { nullable: true })
  dailyPrice?: boolean;

  @Field(() => ServiceDailyPrices, { nullable: true })
  dailyPrices?: ServiceDailyPrices;

  @Field(() => Int, { nullable: true })
  beds?: number;

  @Field(() => Int, { nullable: true })
  bathrooms?: number;

  @Field(() => Int, { nullable: true })
  num_of_rooms?: number;

  @Field(() => ServicePropertyMeasurements, { nullable: true })
  measurements?: ServicePropertyMeasurements;

  // vehicle

  @Field(() => String, { nullable: true })
  brand?: string;

  @Field(() => String, { nullable: true })
  model?: string;

  @Field(() => VehicleProperties, { nullable: true })
  properties?: VehicleProperties;

  // beauty center

  @Field(() => ID, { nullable: true })
  treatmentCategoryId?: string;

  @Field(() => [Int], { nullable: true })
  duration?: number[];

  // health center

  @Field(() => ID, { nullable: true })
  specialityId?: string;

  @Field(() => [HealthCenterDoctorSpeakingLanguage])
  speakingLanguages: HealthCenterDoctorSpeakingLanguage[];

  @Field(() => HealthCenterDoctorAvailablityStatus, { nullable: true })
  availablityStatus?: HealthCenterDoctorAvailablityStatus;

  // restaurant

  @Field(() => [String], { nullable: true })
  ingredients?: string[];

  @Field(() => ID, { nullable: true })
  menuId?: string;

  @Field(() => String, { nullable: true })
  dishTypeId?: string;

  @Field(() => Int, { nullable: true })
  sales?: number;
}
