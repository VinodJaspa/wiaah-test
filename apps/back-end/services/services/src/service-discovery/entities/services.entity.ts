import { Treatment } from '@beauty-center';
import {
  HotelRoom,
  ServiceCancelationPolicy,
  ServiceContact,
  ServiceLocation,
  ServiceMetaInfo,
  ServiceMetaInfoTranslation,
  ServicePolicy,
  ServicePresentation,
  ServiceTranslationPolicy,
} from '@entities';
import { Doctor } from '@health-center';
import {
  Field,
  Float,
  ID,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { RestaurantMenu } from '@restaurant';
import { Vehicle } from '@vehicle-service';
import { WorkingSchedule } from '@working-schedule/entities';
import {
  ServicePaymentMethods,
  ServiceStatus,
  ServiceType,
  ServiceTypeOfSeller,
} from 'prismaClient';

registerEnumType(ServiceType, { name: 'ServiceType' });

@ObjectType()
export class ServiceShopRaw {
  @Field(() => ID)
  id: string;

  @Field(() => ServiceType)
  type: ServiceType;

  @Field(() => ID)
  ownerId: String;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

  @Field(() => ServiceStatus)
  status: ServiceStatus;

  @Field(() => [ServicePresentation])
  presentations: ServicePresentation[];

  @Field(() => [ServiceMetaInfoTranslation])
  serviceMetaInfo: ServiceMetaInfoTranslation[];

  @Field(() => ServiceContact)
  contact: ServiceContact;

  @Field(() => WorkingSchedule, { nullable: true })
  workingHours?: WorkingSchedule;

  @Field(() => [ServiceTranslationPolicy])
  policies: ServiceTranslationPolicy[];

  @Field(() => [ServicePaymentMethods])
  payment_methods: ServicePaymentMethods[];

  @Field(() => ServiceLocation)
  location: ServiceLocation;

  @Field(() => Float)
  vat: number;

  @Field(() => [ServiceCancelationPolicy])
  cancelationPolicies: ServiceCancelationPolicy[];

  @Field(() => Float)
  lowest_price: number;

  @Field(() => Float)
  highest_price: number;

  @Field(() => Float)
  rating: number;

  @Field(() => Int)
  reviews: number;

  @Field(() => ServiceTypeOfSeller)
  type_of_seller: ServiceTypeOfSeller;

  @Field(() => String, { nullable: true })
  suspensionReason?: string;

  @Field(() => [HotelRoom], { nullable: true })
  rooms?: HotelRoom[];

  @Field(() => [RestaurantMenu], { nullable: true })
  menus?: RestaurantMenu[];

  @Field(() => String, { nullable: true })
  establishmentTypeId?: string;

  @Field(() => String, { nullable: true })
  cuisinesTypeId?: string;

  @Field(() => String, { nullable: true })
  setting_and_ambianceId?: string;

  @Field(() => Int, { nullable: true })
  michelin_guide_stars?: number;

  @Field(() => [Doctor], { nullable: true })
  doctors?: Doctor[];

  @Field(() => [Treatment], { nullable: true })
  treatments?: Treatment;

  @Field(() => [Vehicle], { nullable: true })
  vehicle?: Vehicle[];
}
