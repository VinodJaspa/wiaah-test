import {
  ServiceLocation,
  ServiceMetaInfo,
  ServicePolicy,
  ServicePresentation,
} from '@entities';
import {
  ObjectType,
  Field,
  Int,
  ID,
  registerEnumType,
  Float,
} from '@nestjs/graphql';
import { ServicePaymentMethods, ServiceStatus } from 'prismaClient';
import { RestaurantMenu } from './restaurant-menu.entity';

registerEnumType(ServiceStatus, { name: 'ServiceStatus' });
registerEnumType(ServicePaymentMethods, { name: 'ServicePaymentMethods' });

@ObjectType()
export class Restaurant {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  ownerId: string;

  @Field(() => Int)
  vat: number;

  @Field(() => ServiceStatus)
  status: ServiceStatus;

  @Field(() => ServiceLocation)
  location: ServiceLocation;

  @Field(() => [ServicePresentation])
  presentations: ServicePresentation[];

  @Field(() => [ServicePolicy])
  policies: ServicePolicy[];

  @Field(() => ServiceMetaInfo)
  serviceMetaInfo: ServiceMetaInfo;

  @Field(() => [ServicePaymentMethods])
  payment_methods: ServicePaymentMethods[];

  @Field(() => [RestaurantMenu])
  menus: RestaurantMenu[];

  @Field(() => Float)
  lowest_price: number;

  @Field(() => Float)
  highest_price: number;

  @Field(() => ID)
  setting_and_ambianceId: string;

  @Field(() => ID)
  establishmentTypeId: string;

  @Field(() => ID)
  cuisinesTypeId: string;

  @Field(() => Int)
  michelin_guide_stars: number;
}
