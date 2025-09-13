import { ServiceCancelationPolicyInput, ServiceLocationInput, ServiceMetaInfoTranslationInput, ServicePolicyTranslatedInput } from '@dto';
import { ServiceContact, ServiceMetaInfo, ServiceMetaInfoTranslation } from '@entities';
import { ServiceContactInput } from '@hotel/dto';
import { InputType, Field, Float, ID, Int } from '@nestjs/graphql';
import { RestaurantMenu } from '@restaurant/entities';
import {
  ServiceStatus,
  ServicePresentationType,
  ServiceTranslationPolicies,
  ServiceMetaTranslationInfo,
  ServicePaymentMethods,
  Location,
} from 'prismaClient';
import { RestaurantMenuInput } from './create-restaurant-menu.input';
@InputType()
export class CreateRestaurantInput {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  ownerId: string;

  @Field(() => Int, { defaultValue: 0 })
  vat: number;

  @Field(() => ServiceStatus, {
    nullable: true,
    defaultValue: ServiceStatus.inActive,
  })
  status?: ServiceStatus;

  @Field(() => [ServicePresentationType])
  presentations: ServicePresentationType[];

  @Field(() => [ServicePolicyTranslatedInput])
  policies: ServiceTranslationPolicies[];

  @Field(() => [ServiceMetaInfoTranslationInput])
  serviceMetaInfo: ServiceMetaTranslationInfo[];

  @Field(() => [ServicePaymentMethods])
  payment_methods: ServicePaymentMethods[];

  @Field(() => [ServiceCancelationPolicyInput])
  cancelationPolicies: ServiceCancelationPolicyInput[];

  @Field(() => [ServiceContactInput])
  contact: ServiceContact;

  @Field(() => ServiceLocationInput)
  location: Location;

  @Field(() => Float, { defaultValue: 0 })
  lowest_price: number;

  @Field(() => Float, { defaultValue: 0 })
  highest_price: number;

  @Field(() => [RestaurantMenuInput])
  menus: RestaurantMenu[];

  @Field(() => ID)
  establishmentTypeId: string;

  @Field(() => ID)
  cuisinesTypeId: string;

  @Field(() => ID)
  setting_and_ambianceId: string;

  @Field(() => Int)
  michelin_guide_stars: number;

  @Field(() => Float, { defaultValue: 0 })
  rating: number;

  @Field(() => Int, { defaultValue: 0 })
  reviews: number;
}
