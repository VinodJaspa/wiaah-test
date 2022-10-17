import {
  ServiceMetaInfoTranslationInput,
  ServicePolicyTranslatedInput,
  ServicePresentationInput,
} from '@dto';
import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { ServicePaymentMethods, ServiceStatus } from 'prismaClient';
import { RestaurantMenuInput } from '@restaurant';
import { ServicePresentationsLength, TranslationsInput } from '@decorators';

@InputType()
export class CreateRestaurantInput {
  @Field(() => Int)
  vat: number;

  @Field(() => Int)
  cancelation_fee: number;

  @Field(() => ServiceStatus, { nullable: true })
  status?: ServiceStatus;

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
