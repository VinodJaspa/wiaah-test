import { InputType, Field, PartialType, ID, Int } from '@nestjs/graphql';
import { ServicePresentationsLength, TranslationsInput } from '@decorators';
import {
  ServiceLocationInput,
  ServicePresentationInput,
  ServicePolicyTranslatedInput,
  ServiceMetaInfoTranslationInput,
  TranslationTextInput,
  TranslationTextArrayInput,
} from '@dto';
import { ServiceStatus, ServicePaymentMethods } from 'prismaClient';

@InputType()
export class updateInput {
  @Field(() => Int)
  vat: number;

  @Field(() => ServiceStatus, { nullable: true })
  status?: ServiceStatus;

  @Field(() => ServiceLocationInput)
  location: ServiceLocationInput;

  @Field(() => [ServicePresentationInput])
  @ServicePresentationsLength()
  presentations: ServicePresentationInput[];

  @Field(() => [ServicePolicyTranslatedInput])
  @TranslationsInput()
  policies: ServicePolicyTranslatedInput[];

  @Field(() => [ServiceMetaInfoTranslationInput])
  @TranslationsInput()
  serviceMetaInfo: ServiceMetaInfoTranslationInput[];

  @Field(() => [ServicePaymentMethods])
  payment_methods: ServicePaymentMethods[];

  @Field(() => [UpdateRestaurantInput])
  menus: UpdateRestaurantInput[];

  @Field(() => ID)
  establishmentTypeId: string;

  @Field(() => ID)
  cuisinesTypeId: string;

  @Field(() => ID)
  setting_and_ambianceId: string;

  @Field(() => Int)
  michelin_guide_stars: number;
}

@InputType()
export class UpdateRestaurantMenuDishInput {
  @Field(() => ID)
  id: string;

  @Field(() => [TranslationTextInput])
  @TranslationsInput()
  name: TranslationTextInput[];

  @Field(() => Int)
  price: number;

  @Field(() => [TranslationTextArrayInput])
  @TranslationsInput()
  ingredients: TranslationTextArrayInput[];

  @Field(() => String)
  thumbnail: string;
}

@InputType()
export class UpdateRestaurantMenuInput {
  @Field(() => ID)
  id: string;

  @Field(() => [TranslationTextInput])
  @TranslationsInput()
  name: TranslationTextInput[];

  @Field(() => [UpdateRestaurantMenuDishInput])
  dishs: UpdateRestaurantMenuDishInput[];
}

@InputType()
export class UpdateRestaurantInput extends PartialType(updateInput) {
  @Field(() => ID)
  id: string;
}
