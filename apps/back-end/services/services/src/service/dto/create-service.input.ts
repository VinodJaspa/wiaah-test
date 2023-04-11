import { CreateBeautyCenterTreatmentInput } from '@beauty-center';
import { SERVICE_MAX_VAT_PERCENT, SERVICE_MIN_VAT_PERCENT } from '@const';
import { ServicePresentationsLength, TranslationsInput } from '@decorators';
import {
  ServiceAmenitiesInput,
  ServiceCancelationPolicyInput,
  ServiceDailyPricesInput,
  ServiceDiscountInput,
  ServiceExtraInput,
  ServiceIncludedAmenitiesInput,
  ServiceIncludedServicesInput,
  ServiceLocationInput,
  ServiceMetaInfoTranslationInput,
  ServicePolicyTranslatedInput,
  ServicePropertyMeasurementsInput,
  TranslationTextArrayInput,
  TranslationTextInput,
} from '@dto';
import { InputType, Field, ID, Int, Float } from '@nestjs/graphql';
import { CreateVehiclePropertiesInput } from '@vehicle-service/dto/create-vehicle.input';
import { Max, Min } from 'class-validator';
import {
  HealthCenterDoctorAvailablityStatus,
  ServicePaymentMethods,
  ServiceStatus,
  ServiceType,
  ServiceTypeOfSeller,
} from 'prismaClient';

import { GraphQLUpload, Upload } from 'graphql-upload';
import { CreateInputGqlTranslationInputField, FieldRequired } from 'nest-utils';
import { ServiceContactInput } from '@hotel/dto';

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
  @Field(() => ServiceType)
  type: ServiceType;

  @Field(() => ServiceStatus)
  status: ServiceStatus;

  @Field(() => Float)
  price: number;

  @Field(() => ServiceContactInput)
  contact: ServiceContactInput;

  @Field(() => [GraphQLUpload])
  @ServicePresentationsLength()
  presentations: Upload[];

  @Field(() => ServiceLocationInput)
  location: ServiceLocationInput;

  @Field(() => [ServicePolicyTranslatedInput])
  @TranslationsInput()
  policies: ServicePolicyTranslatedInput[];

  @Field(() => [ServiceMetaInfoTranslationInput])
  @TranslationsInput()
  serviceMetaInfo: ServiceMetaInfoTranslationInput[];

  @Field(() => [ServicePaymentMethods])
  payment_methods: ServicePaymentMethods[];

  @Field(() => ServiceTypeOfSeller)
  type_of_seller: ServiceTypeOfSeller;

  @Field(() => [ServiceCancelationPolicyInput])
  cancelationPolicies: ServiceCancelationPolicyInput[];

  @Field(() => Float)
  @Max(SERVICE_MAX_VAT_PERCENT)
  @Min(SERVICE_MIN_VAT_PERCENT)
  vat: number;

  @Field(() => GraphQLUpload)
  thumbnail: Upload;

  @Field(() => [ServiceHotelRoomInput], { nullable: true })
  @FieldRequired('type', ServiceType.hotel)
  rooms?: ServiceHotelRoomInput[];

  @Field(() => [ServiceRestaurantMenuInput], { nullable: true })
  @FieldRequired('type', ServiceType.restaurant)
  menus?: ServiceRestaurantMenuInput[];

  @Field(() => ID, { nullable: true })
  @FieldRequired('type', ServiceType.restaurant)
  establishmentTypeId?: string;

  @Field(() => ID, { nullable: true })
  @FieldRequired('type', ServiceType.restaurant)
  cuisinesTypeId?: string;

  @Field(() => ID, { nullable: true })
  @FieldRequired('type', ServiceType.restaurant)
  setting_and_ambianceId?: string;

  @Field(() => Int, { nullable: true })
  @FieldRequired('type', ServiceType.restaurant)
  michelin_guide_stars?: number;

  @Field(() => [ServiceHealthCenterDoctorInput], { nullable: true })
  @FieldRequired('type', ServiceType.health_center)
  doctors?: ServiceHealthCenterDoctorInput[];

  @Field(() => [CreateBeautyCenterTreatmentInput], { nullable: true })
  @FieldRequired('type', ServiceType.beauty_center)
  treatments?: CreateBeautyCenterTreatmentInput[];

  @Field(() => [ServiceVehicleInput], { nullable: true })
  @FieldRequired('type', ServiceType.vehicle)
  vehicles?: ServiceVehicleInput[];
}
