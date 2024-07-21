import { TranslationsInput } from "@decorators";
import {
  ServiceAmenitiesInput,
  ServiceCancelationPolicyInput,
  ServiceDailyPricesInput,
  ServiceDiscountInput,
  ServiceExtraInput,
  ServiceIncludedAmenitiesInput,
  ServiceIncludedServicesInput,
  ServicePresentationInput,
  ServicePropertyMeasurementsInput,
} from "@dto";
import { Field, Float, InputType, Int } from "@nestjs/graphql";
import { CreateInputGqlTranslationInputField } from "nest-utils";
import { GraphQLUpload, Upload } from "graphql-upload-ts";

@InputType()
class HotelRoomMetaInfoInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;
}

@InputType()
class HotelRoomTranslationMetaInfoInput extends CreateInputGqlTranslationInputField<HotelRoomMetaInfoInput>(
  HotelRoomMetaInfoInput
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

  @Field(() => [ServicePresentationInput])
  presentations: ServicePresentationInput[];
}
