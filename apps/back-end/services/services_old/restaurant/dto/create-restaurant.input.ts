import {
  ServiceLocationInput,
  ServiceMetaInfoTranslationInput,
  ServicePolicyTranslatedInput,
  ServicePresentationInput,
} from '@dto';
import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { ServiceStatus } from 'prismaClient';
import { ServicePresentationsLength, TranslationsInput } from '@decorators';
import { ServiceContactInput } from '@hotel/dto';
import { RestaurantMenuInput } from './create-restaurant-menu.input';

@InputType()
export class CreateRestaurantInput {
  @Field(() => ServiceContactInput)
  contact: ServiceContactInput;

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

  @Field(() => [RestaurantMenuInput])
  menus: RestaurantMenuInput[];

  @Field(() => ID)
  establishmentTypeId: string;

  @Field(() => ID)
  cuisinesTypeId: string;

  @Field(() => ID)
  setting_and_ambianceId: string;

  @Field(() => Int)
  michelin_guide_stars: number;
}
