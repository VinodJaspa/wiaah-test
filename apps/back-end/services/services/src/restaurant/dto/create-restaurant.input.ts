import { ServiceCancelationPolicy } from '@entities';
import { InputType, Field, Float, ID, Int } from '@nestjs/graphql';
import {} from '@restaurant/entities';
import {
  ServiceStatus,
  ServicePresentationType,
  ServiceTranslationPolicies,
  ServiceMetaTranslationInfo,
  ServicePaymentMethods,
  ServiceContact,
  RestaurantMenu,
  Location,
} from 'prismaClient';
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

  @Field(() => [])
  presentations: ServicePresentationType[];

  @Field(() => [])
  policies: ServiceTranslationPolicies[];

  @Field(() => [])
  serviceMetaInfo: ServiceMetaTranslationInfo[];

  @Field(() => [ServicePaymentMethods])
  payment_methods: ServicePaymentMethods[];

  @Field(() => [])
  cancelationPolicies: ServiceCancelationPolicy[];

  @Field()
  contact: ServiceContact;

  @Field(() => Location)
  location: Location;

  @Field(() => Float, { defaultValue: 0 })
  lowest_price: number;

  @Field(() => Float, { defaultValue: 0 })
  highest_price: number;

  @Field(() => [])
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
