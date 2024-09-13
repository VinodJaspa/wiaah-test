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
  ServiceStatus,
  ServiceType,
  TranslationArrayText,
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
) { }

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

  @Field(() => String)
  sellerId: string;

  @Field(() => [TranslationTextInput])
  @IsValidTranslationArray() // Custom validation to ensure valid translation array
  name: TranslationTextInput[];

  @Field(() => [TranslationTextInput])
  @IsValidTranslationArray() // Custom validation to ensure valid translation array
  description: TranslationTextInput[];

  @Field(() => [ServicePolicyTranslatedInput])
  policies: ServicePolicyTranslatedInput[];

  @Field(() => Boolean)
  cancelable: boolean;

  @Field(() => CancelationType, { nullable: true })
  @FieldRequired('cancelable', true) // Conditional field required based on 'cancelable'
  cancelationPolicy?: CancelationType; // Made optional

  @Field(() => Float)
  @Max(SERVICE_MAX_VAT_PERCENT)
  @Min(SERVICE_MIN_VAT_PERCENT)
  vat: number;

  @Field(() => String)
  thumbnail: string;

  @Field(() => Boolean)
  isExternal: boolean;

  @Field(() => [String])
  hashtags: string[];

  // Hotel room & rental
  @Field(() => [TranslationTextInput], { nullable: true })
  @FieldRequired('type', ServiceType.hotel) // Required if service type is 'hotel'
  @IsValidTranslationArray() // Custom validation to ensure valid translation array
  popularAmenities?: TranslationTextInput[];

  @Field(() => [ServiceExtraInput], { nullable: true })
  @FieldRequired('type', ServiceType.hotel) // Required if service type is 'hotel'
  extras?: ServiceExtraInput[];

  @Field(() => [TranslationTextInput], { nullable: true })
  @IsValidTranslationArray() // Custom validation to ensure valid translation array
  @FieldRequired('type', ServiceType.hotel) // Required if service type is 'hotel'
  includedAmenities?: TranslationTextInput[];

  @Field(() => Boolean, { nullable: true })
  @FieldRequired('type', ServiceType.hotel) // Required if service type is 'hotel'
  dailyPrice?: boolean;

  @Field(() => ServiceDailyPricesInput, { nullable: true })
  @FieldRequired('type', ServiceType.hotel) // Required if service type is 'hotel'
  dailyPrices?: ServiceDailyPricesInput;

  @Field(() => Int, { nullable: true })
  @FieldRequired('type', ServiceType.hotel) // Required if service type is 'hotel'
  beds?: number;

  @Field(() => Int, { nullable: true })
  @FieldRequired('type', ServiceType.hotel) // Required if service type is 'hotel'
  bathrooms?: number;

  @Field(() => Int, { nullable: true })
  @FieldRequired('type', ServiceType.hotel) // Required if service type is 'hotel'
  num_of_rooms?: number;

  @Field(() => ServicePropertyMeasurementsInput, { nullable: true })
  @FieldRequired('type', ServiceType.hotel) // Required if service type is 'hotel'
  measurements?: ServicePropertyMeasurementsInput;

  @Field(() => [Adaptation], { nullable: true })
  @FieldRequired('type', ServiceType.hotel) // Required if service type is 'hotel'
  adaptedFor?: Adaptation[];

  @Field(() => [Restriction], { nullable: true })
  @FieldRequired('type', ServiceType.hotel) // Required if service type is 'hotel'
  restriction?: Restriction[];

  @Field(() => Boolean, { nullable: true })
  @FieldRequired('type', ServiceType.hotel) // Required if service type is 'hotel'
  deposit?: boolean;

  @Field(() => Int, { nullable: true })
  @FieldRequired('deposit', true) // Required if 'deposit' is true
  depositAmount?: number;

  @Field(() => Int, { nullable: true })
  @FieldRequired('type', ServiceType.hotel) // Required if service type is 'hotel'
  units?: number;

  // Rental specific fields
  @Field(() => RentalTypeOfPlace, { nullable: true })
  @FieldRequired('type', ServiceType.holiday_rentals) // Required if service type is 'holiday_rentals'
  typeOfPlace?: RentalTypeOfPlace;

  @Field(() => RentalPropertyType, { nullable: true })
  @FieldRequired('type', ServiceType.holiday_rentals) // Required if service type is 'holiday_rentals'
  propertyType?: RentalPropertyType;

  @Field(() => Float, { nullable: true })
  cleaningFee?: number;

  // Vehicle specific fields
  @Field(() => String, { nullable: true })
  @FieldRequired('type', ServiceType.vehicle) // Required if service type is 'vehicle'
  brand?: string;

  @Field(() => String, { nullable: true })
  @FieldRequired('type', ServiceType.vehicle) // Required if service type is 'vehicle'
  model?: string;

  @Field(() => Int, { nullable: true })
  @FieldRequired('type', ServiceType.vehicle) // Required if service type is 'vehicle'
  seats?: number;

  @Field(() => Int, { nullable: true })
  @FieldRequired('type', ServiceType.vehicle) // Required if service type is 'vehicle'
  windows?: number;

  @Field(() => Int, { nullable: true })
  @FieldRequired('type', ServiceType.vehicle) // Required if service type is 'vehicle'
  maxSpeedInKm?: number;

  @Field(() => Int, { nullable: true })
  @FieldRequired('type', ServiceType.vehicle) // Required if service type is 'vehicle'
  lugaggeCapacity?: number;

  @Field(() => Boolean, { nullable: true })
  @FieldRequired('type', ServiceType.vehicle) // Required if service type is 'vehicle'
  gpsAvailable?: boolean;

  @Field(() => Boolean, { nullable: true })
  @FieldRequired('type', ServiceType.vehicle) // Required if service type is 'vehicle'
  airCondition?: boolean;

  @Field(() => String, { nullable: true })
  @FieldRequired('type', ServiceType.vehicle) // Required if service type is 'vehicle'
  vehicleCategoryId?: string;

  // Beauty center specific fields
  @Field(() => ID, { nullable: true })
  @FieldRequired('type', ServiceType.beauty_center) // Required if service type is 'beauty_center'
  treatmentCategoryId?: string;

  @Field(() => Int, { nullable: true })
  @FieldRequired('type', ServiceType.beauty_center) // Required if service type is 'beauty_center'
  duration?: number;

  // Health center specific fields
  @Field(() => ID, { nullable: true })
  @FieldRequired('type', ServiceType.health_center) // Required if service type is 'health_center'
  specialityId?: string;

  @Field(() => [HealthCenterDoctorSpeakingLanguage])
  @FieldRequired('type', ServiceType.health_center) // Required if service type is 'health_center'
  speakingLanguages: HealthCenterDoctorSpeakingLanguage[];

  @Field(() => [String], { nullable: true })
  @FieldRequired('type', ServiceType.health_center) // Required if service type is 'health_center'
  availableAppointments?: Date[];

  @Field(() => Int, { nullable: true })
  @FieldRequired('type', ServiceType.health_center) // Required if service type is 'health_center'
  sessionDurationMins: number;

  // Restaurant specific fields
  @Field(() => [TranslationTextArrayInput], { nullable: true })
  @IsValidTranslationArray() // Custom validation to ensure valid translation array
  @FieldRequired('type', ServiceType.restaurant) // Required if service type is 'restaurant'
  ingredients?: TranslationTextArrayInput[];

  @Field(() => RestaurantDishType, { nullable: true })
  @FieldRequired('type', ServiceType.restaurant) // Required if service type is 'restaurant'
  menuType?: RestaurantDishType;

  @Field(() => Float)
  rating: number;

  @Field(() => Int)
  reviews: number;

  @Field(() => ServiceStatus)
  status: ServiceStatus;

  @Field(() => [TranslationTextInput])
  includedServices: TranslationTextInput[];
}
