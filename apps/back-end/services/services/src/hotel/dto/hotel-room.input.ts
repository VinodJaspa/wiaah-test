import { TranslationsInput } from '@decorators';
import {
  ServiceAmenitiesInput,
  ServiceCancelationPolicyInput,
  ServiceDailyPricesInput,
  ServiceDiscountInput,
  ServiceExtraInput,
  ServiceIncludedAmenitiesInput,
  ServiceIncludedServicesInput,
  ServicePropertyMeasurementsInput,
} from '@dto';
import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { CreateGqlTranslationInputField } from 'nest-utils';

@InputType()
class HotelRoomMetaInfoInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;
}

@InputType()
class HotelRoomTranslationMetaInfoInput extends CreateGqlTranslationInputField<HotelRoomMetaInfoInput>(
  HotelRoomMetaInfoInput,
) {}

@InputType()
export class HotelRoomInput {
  @Field(() => [HotelRoomTranslationMetaInfoInput])
  @TranslationsInput()
  roomMetaInfo: HotelRoomTranslationMetaInfoInput[];

  @Field(() => Int)
  pricePerNight: number;

  @Field(() => Boolean)
  dailyPrice: boolean;

  @Field(() => ServiceDailyPricesInput)
  dailyPrices: ServiceDailyPricesInput;

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
}
