import { SERVICE_MAX_VAT_PERCENT, SERVICE_MIN_VAT_PERCENT } from '@const';
import { TranslationsInput } from '@decorators';
import {
  ServiceAmenitiesInput,
  ServiceCancelationPolicyInput,
  ServiceDailyPricesInput,
  ServiceDiscountInput,
  ServiceExtraInput,
  ServiceIncludedAmenitiesInput,
  ServiceIncludedServicesInput,
  ServicePolicyTranslatedInput,
  ServicePropertyMeasurementsInput,
  TranslationTextArrayInput,
  TranslationTextInput,
} from '@dto';
import { InputType, Field, ID, Int, Float } from '@nestjs/graphql';
import { CreateVehiclePropertiesInput } from '@vehicle-service/dto/create-vehicle.input';
import { Max, Min } from 'class-validator';
import {
  Adaptation,
  CancelationType,
  HealthCenterDoctorAvailablityStatus,
  HealthCenterDoctorSpeakingLanguage,
  RentalPropertyType,
  RentalTypeOfPlace,
  RestaurantDishType,
  Restriction,
  ServiceType,
} from 'prismaClient';

import { GraphQLUpload, Upload } from 'graphql-upload-ts';
import {
  CreateInputGqlTranslationInputField,
  FieldRequired,
  IsValidTranslationArray,
} from 'nest-utils';

@InputType()
class ServiceHotelRoomMetaInfoInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;
}

@InputType()
class ServiceHotelRoomTranslationMetaInfoInput extends CreateInputGqlTranslationInputField<ServiceHotelRoomMetaInfoInput>(
  ServiceHotelRoomMetaInfoInput,
) {}

@InputType()
class ServiceHotelRoomInput {
  @Field(() => [ServiceHotelRoomTranslationMetaInfoInput])
  @TranslationsInput()
  roomMetaInfo: ServiceHotelRoomTranslationMetaInfoInput[];

  @Field(() => Int)
  pricePerNight: number;

  @Field(() => Boolean)
  dailyPrice: boolean;

  @Field(() => ServiceDailyPricesInput, { nullable: true })
  dailyPrices?: ServiceDailyPricesInput;

  @Field(() => ServiceDiscountInput)
  discount: ServiceDiscountInput;

  @Field(() => [ServiceIncludedServicesInput])
  @TranslationsInput()
  includedServices: ServiceIncludedServicesInput[];

  @Field(() => [ServiceAmenitiesInput])
  popularAmenities: ServiceAmenitiesInput[];

  @Field(() => [ServiceCancelationPolicyInput])
  cancelationPolicies: ServiceCancelationPolicyInput[];

  @Field(() => Int)
  beds: number;

  @Field(() => Int)
  bathrooms: number;

  @Field(() => [ServiceExtraInput])
  extras: ServiceExtraInput[];

  @Field(() => Int)
  num_of_rooms: number;

  @Field(() => [ServiceIncludedAmenitiesInput])
  @TranslationsInput()
  includedAmenities: ServiceIncludedAmenitiesInput[];

  @Field(() => ServicePropertyMeasurementsInput)
  measurements: ServicePropertyMeasurementsInput;

  @Field(() => Float)
  insurance: number;

  @Field(() => [GraphQLUpload])
  presentations: Upload[];
}

@InputType()
class ServiceRestaurantMenuDishInput {
  @Field(() => [TranslationTextInput])
  @TranslationsInput()
  name: TranslationTextInput[];

  @Field(() => Int)
  price: number;

  @Field(() => [TranslationTextArrayInput])
  @TranslationsInput()
  ingredients: TranslationTextArrayInput[];

  @Field(() => GraphQLUpload)
  thumbnail: Upload;
}

@InputType()
class ServiceRestaurantMenuInput {
  @Field(() => [TranslationTextInput])
  @TranslationsInput()
  name: TranslationTextInput[];

  @Field(() => [ServiceRestaurantMenuDishInput])
  dishs: ServiceRestaurantMenuDishInput[];
}

@InputType()
class ServiceHealthCenterDoctorInput {
  @Field(() => ID)
  specialityId: string;

  @Field(() => String)
  name: string;

  @Field(() => GraphQLUpload)
  thumbnail: Upload;

  @Field(() => Float)
  price: number;

  @Field(() => [TranslationTextInput])
  description: TranslationTextInput[];

  @Field(() => HealthCenterDoctorAvailablityStatus)
  availablityStatus: HealthCenterDoctorAvailablityStatus;
}

@InputType()
export class ServiceVehicleInput {
  @Field(() => ID)
  typeId: string;

  @Field(() => [TranslationTextInput])
  @TranslationsInput()
  title: TranslationTextInput[];

  @Field(() => [GraphQLUpload])
  presentations: Upload[];

  @Field(() => [ServiceCancelationPolicyInput])
  cancelationPolicies: ServiceCancelationPolicyInput[];

  @Field(() => String)
  brand: string;

  @Field(() => String)
  model: string;

  @Field(() => Float)
  price: number;

  @Field(() => CreateVehiclePropertiesInput)
  properties: CreateVehiclePropertiesInput;

  @Field(() => Float)
  insurance: number;
}

@InputType()
export class CreateServiceInput {
  @Field(() => Float)
  price: number;

  @Field(() => [TranslationTextInput])
  @IsValidTranslationArray()
  name: TranslationTextInput[];

  @Field(() => [TranslationTextInput])
  @IsValidTranslationArray()
  description: TranslationTextInput[];

  @Field(() => [ServicePolicyTranslatedInput])
  policies: ServicePolicyTranslatedInput[];

  @Field(() => Boolean)
  cancelable: boolean;

  @Field(() => CancelationType, { nullable: true })
  @FieldRequired('cancelable', true)
  cancelationPolicy: CancelationType;

  @Field(() => Float)
  @Max(SERVICE_MAX_VAT_PERCENT)
  @Min(SERVICE_MIN_VAT_PERCENT)
  vat: number;

  // uploaded image id
  @Field(() => GraphQLUpload)
  thumbnail: Upload;

  @Field(() => Boolean)
  isExternal: boolean;

  @Field(() => [String])
  hashtags: string[];

  // Hotel room & rental
  @Field(() => [TranslationTextInput], { nullable: true })
  @FieldRequired('type', ServiceType.hotel)
  @IsValidTranslationArray()
  popularAmenities: TranslationTextInput[];

  // @Field(() => [TranslationTextInput], { nullable: true })
  // @IsValidTranslationArray()
  // @FieldRequired('type', ServiceType.hotel)
  // includedServices: TranslationTextInput[];

  @Field(() => [ServiceExtraInput], { nullable: true })
  @FieldRequired('type', ServiceType.hotel)
  extras: ServiceExtraInput[];

  @Field(() => [TranslationTextInput], { nullable: true })
  @IsValidTranslationArray()
  @FieldRequired('type', ServiceType.hotel)
  includedAmenities: TranslationTextInput[];

  @Field(() => Boolean, { nullable: true })
  @FieldRequired('type', ServiceType.hotel)
  dailyPrice?: boolean;

  @Field(() => ServiceDailyPricesInput, { nullable: true })
  @FieldRequired('type', ServiceType.hotel)
  dailyPrices?: ServiceDailyPricesInput;

  @Field(() => Int, { nullable: true })
  @FieldRequired('type', ServiceType.hotel)
  beds?: number;

  @Field(() => Int, { nullable: true })
  @FieldRequired('type', ServiceType.hotel)
  bathrooms?: number;

  @Field(() => Int, { nullable: true })
  @FieldRequired('type', ServiceType.hotel)
  num_of_rooms?: number;

  @Field(() => ServicePropertyMeasurementsInput, { nullable: true })
  @FieldRequired('type', ServiceType.hotel)
  measurements?: ServicePropertyMeasurementsInput;

  @Field(() => [Adaptation], { nullable: true })
  @FieldRequired('type', ServiceType.hotel)
  adaptedFor: Adaptation[];

  @Field(() => [Restriction], { nullable: true })
  @FieldRequired('type', ServiceType.hotel)
  restriction: Restriction[];

  @Field(() => Boolean, { nullable: true })
  @FieldRequired('type', ServiceType.hotel)
  deposit?: boolean;

  @Field(() => Int, { nullable: true })
  @FieldRequired('deposit', true)
  depositAmount?: number;

  @Field(() => Int, { nullable: true })
  @FieldRequired('type', ServiceType.hotel)
  units?: number;

  // rental only

  @Field(() => RentalTypeOfPlace, { nullable: true })
  @FieldRequired('type', ServiceType.holiday_rentals)
  typeOfPlace?: RentalTypeOfPlace;

  @Field(() => RentalPropertyType, { nullable: true })
  @FieldRequired('type', ServiceType.holiday_rentals)
  propertyType?: RentalPropertyType;

  @Field(() => Float, { nullable: true })
  cleaningFee?: number;

  // vehicle
  @Field(() => String, { nullable: true })
  @FieldRequired('type', ServiceType.vehicle)
  brand?: string;

  @Field(() => String, { nullable: true })
  @FieldRequired('type', ServiceType.vehicle)
  model?: string;

  @Field(() => Int, { nullable: true })
  @FieldRequired('type', ServiceType.vehicle)
  seats?: number;

  @Field(() => Int, { nullable: true })
  @FieldRequired('type', ServiceType.vehicle)
  windows?: number;

  @Field(() => Int, { nullable: true })
  @FieldRequired('type', ServiceType.vehicle)
  maxSpeedInKm?: number;

  @Field(() => Int, { nullable: true })
  @FieldRequired('type', ServiceType.vehicle)
  lugaggeCapacity?: number;

  @Field(() => Boolean, { nullable: true })
  @FieldRequired('type', ServiceType.vehicle)
  gpsAvailable?: boolean;

  @Field(() => Boolean, { nullable: true })
  @FieldRequired('type', ServiceType.vehicle)
  airCondition?: boolean;

  @Field(() => String, { nullable: true })
  @FieldRequired('type', ServiceType.vehicle)
  vehicleCategoryId?: string;

  // beauty center
  @Field(() => ID, { nullable: true })
  @FieldRequired('type', ServiceType.beauty_center)
  treatmentCategoryId?: string;

  @Field(() => Int, { nullable: true })
  @FieldRequired('type', ServiceType.beauty_center)
  duration?: number;

  // health center
  @Field(() => ID, { nullable: true })
  @FieldRequired('type', ServiceType.health_center)
  specialityId?: string;

  @Field(() => [HealthCenterDoctorSpeakingLanguage])
  @FieldRequired('type', ServiceType.health_center)
  speakingLanguages: HealthCenterDoctorSpeakingLanguage[];

  @Field(() => [String], { nullable: true })
  @FieldRequired('type', [ServiceType.health_center])
  availableAppointments?: Date[];

  @Field(() => Int, { nullable: true })
  @FieldRequired('type', [ServiceType.health_center])
  sessionDurationMins: number;

  // restaurant
  @Field(() => [TranslationTextArrayInput], { nullable: true })
  @IsValidTranslationArray()
  @FieldRequired('type', ServiceType.restaurant)
  ingredients?: TranslationTextArrayInput[];

  @Field(() => RestaurantDishType, { nullable: true })
  @FieldRequired('type', ServiceType.restaurant)
  menuType?: RestaurantDishType;
}
