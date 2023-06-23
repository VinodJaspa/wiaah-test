import {
  ServiceDailyPrices,
  ServiceDiscount,
  ServiceExtra,
  ServicePropertyMeasurements,
  TranslationText,
} from '@entities';
import {
  Directive,
  Field,
  Float,
  ID,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import {
  CreateGqlCursorPaginatedResponse,
  CreateGqlPaginatedResponse,
} from 'nest-utils';
import {
  Adaptation,
  CancelationType,
  HealthCenterDoctorSpeakingLanguage,
  RentalPropertyType,
  RentalTypeOfPlace,
  RestaurantDishType,
  Restriction,
  ServiceType,
} from 'prismaClient';

registerEnumType(HealthCenterDoctorSpeakingLanguage, {
  name: 'DoctorSpeakingLanguage',
});

registerEnumType(RentalTypeOfPlace, {
  name: 'RentalTypeOfPlace',
});

registerEnumType(RentalPropertyType, {
  name: 'RentalPropertyType',
});

registerEnumType(CancelationType, {
  name: 'ServiceCancelationType',
});

registerEnumType(Adaptation, {
  name: 'ServiceAdaptation',
});

registerEnumType(Restriction, {
  name: 'ServiceRestriction',
});

@ObjectType()
@Directive('@key(fields:"id")')
@Directive('@key(fields:"sellerId")')
export class Service {
  // base
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  sellerId: string;

  @Field(() => ServiceType)
  type: ServiceType;

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

  @Field(() => ServiceDiscount, { nullable: true })
  discount: ServiceDiscount;

  @Field(() => Boolean)
  cancelable: boolean;

  @Field(() => CancelationType)
  cancelationPolicy: CancelationType;

  // hotel room
  @Field(() => [String], { nullable: true })
  popularAmenities: string[];

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

  @Field(() => Int, { nullable: true })
  units?: number;

  // holiday rentals
  @Field(() => RentalTypeOfPlace, { nullable: true })
  typeOfPlace?: RentalTypeOfPlace;

  @Field(() => RentalPropertyType, { nullable: true })
  propertyType?: RentalPropertyType;

  @Field(() => Float, { nullable: true })
  cleaningFee?: number;

  // hotel and rental
  @Field(() => [Adaptation], { nullable: true })
  adaptedFor: Adaptation[];

  @Field(() => [Restriction], { nullable: true })
  restriction: Restriction[];

  @Field(() => Boolean, { nullable: true })
  deposit?: boolean;

  @Field(() => Int, { nullable: true })
  depositAmount?: number;

  // vehicle
  @Field(() => String, { nullable: true })
  brand?: string;

  @Field(() => String, { nullable: true })
  model?: string;

  @Field(() => Int, { nullable: true })
  seats?: number;

  @Field(() => Int, { nullable: true })
  windows?: number;

  @Field(() => Int, { nullable: true })
  maxSpeedInKm?: number;

  @Field(() => Int, { nullable: true })
  lugaggeCapacity?: number;

  @Field(() => Boolean, { nullable: true })
  gpsAvailable?: boolean;

  @Field(() => Boolean, { nullable: true })
  airCondition?: boolean;

  @Field(() => String, { nullable: true })
  vehicleCategoryId?: string;

  // beauty center
  @Field(() => ID, { nullable: true })
  treatmentCategoryId?: string;

  @Field(() => Int, { nullable: true })
  duration?: number;

  // health center
  @Field(() => ID, { nullable: true })
  specialityId?: string;

  @Field(() => [HealthCenterDoctorSpeakingLanguage], { nullable: true })
  speakingLanguages?: HealthCenterDoctorSpeakingLanguage[];

  @Field(() => [String], { nullable: true })
  availableAppointments?: Date[];

  @Field(() => Int, { nullable: true })
  sessionDurationMins?: number;

  // restaurant
  @Field(() => [String], { nullable: true })
  ingredients?: string[];

  @Field(() => RestaurantDishType, { nullable: true })
  menuType?: RestaurantDishType;
}

@ObjectType()
export class RawService {
  @Field(() => String)
  id: string;

  @Field(() => String)
  sellerId: string;

  @Field(() => [TranslationText])
  name: TranslationText[];

  @Field(() => [TranslationText])
  description: TranslationText[];

  @Field(() => Float)
  price: number;

  @Field(() => String)
  thumbnail: string;

  @Field(() => Float)
  rating: number;

  @Field(() => Int)
  reviews: number;

  @Field(() => ServiceDiscount)
  discount: ServiceDiscount;
}

@ObjectType()
export class ServiceSearchResponse extends CreateGqlPaginatedResponse(
  Service,
) {}
