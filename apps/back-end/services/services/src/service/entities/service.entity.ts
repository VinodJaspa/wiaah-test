import { Treatment } from '@beauty-center';
import {
  HotelRoom,
  ServiceContact,
  ServiceLocation,
  ServiceMetaInfo,
  ServicePolicy,
  ServicePresentation,
} from '@entities';
import { Doctor } from '@health-center';
import { Directive, Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { RestaurantMenu } from '@restaurant';
import { Vehicle } from '@vehicle-service';
import { WorkingSchedule } from '@working-schedule/entities';
import {
  ServicePaymentMethods,
  ServiceType,
  ServiceTypeOfSeller,
} from 'prismaClient';

@ObjectType()
@Directive('@key(fields:"id")')
@Directive('@key(fields:"id, serviceType")')
export class Service {
  @Field(() => ID)
  id: string;

  @Field(() => ServiceType)
  @Directive('@shareable')
  serviceType: ServiceType;

  @Field(() => String)
  title: string;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  rating: number;

  @Field(() => String)
  thumbnail: string;

  @Field(() => [ServicePresentation], { nullable: true })
  presentation?: ServicePresentation[];

  @Field(() => [String])
  hashtags: string[];

  @Field(() => ServiceLocation)
  location: ServiceLocation;

  @Field(() => ServiceContact)
  contact: ServiceContact;
}

@ObjectType()
export class ServiceDetails {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  ownerId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => ServiceLocation)
  location: ServiceLocation;

  @Field(() => [ServicePresentation])
  presentations: ServicePresentation[];

  @Field(() => [ServicePolicy])
  policies: ServicePolicy[];

  @Field(() => ServiceMetaInfo)
  serviceMetaInfo: ServiceMetaInfo;

  @Field(() => ServiceContact)
  contact: ServiceContact;

  @Field(() => Float)
  lowest_price: number;

  @Field(() => Float)
  highest_price: number;

  @Field(() => [ServicePaymentMethods])
  payment_methods: ServicePaymentMethods[];

  @Field(() => ServiceTypeOfSeller)
  type_of_seller: ServiceTypeOfSeller;

  @Field(() => [HotelRoom], { nullable: true })
  rooms?: HotelRoom[];

  @Field(() => [RestaurantMenu], { nullable: true })
  menus?: RestaurantMenu[];

  @Field(() => ID, { nullable: true })
  setting_and_ambianceId?: string;

  @Field(() => ID, { nullable: true })
  establishmentTypeId?: string;

  @Field(() => ID, { nullable: true })
  cuisinesTypeId?: string;

  @Field(() => Int, { nullable: true })
  michelin_guide_stars?: number;

  @Field(() => [Doctor], { nullable: true })
  doctors?: Doctor[];

  @Field(() => [Treatment], { nullable: true })
  treatments?: Treatment[];

  @Field(() => [Vehicle], { nullable: true })
  vehicles?: Vehicle[];
}
