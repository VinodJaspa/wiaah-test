import {
  ServiceCancelationPolicy,
  ServiceLocation,
  ServiceMetaInfo,
  ServicePolicy,
  ServicePresentation,
} from '@entities';
import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { ServicePaymentMethods } from 'prismaClient';
import { Vehicle } from './vehicle.entity';

@ObjectType()
export class VehicleService {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  ownerId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Float)
  vat: number;

  @Field(() => Float)
  rating: number;

  @Field(() => Int)
  totalReviews: number;

  @Field(() => ServiceLocation)
  location: ServiceLocation;

  @Field(() => String)
  title: string;

  @Field(() => [ServicePresentation])
  presentations: ServicePresentation[];

  @Field(() => [ServicePolicy])
  policies: ServicePolicy[];

  @Field(() => ServiceMetaInfo)
  serviceMetaInfo: ServiceMetaInfo;

  @Field(() => [ServicePaymentMethods])
  payment_methods: ServicePaymentMethods[];

  @Field(() => [ServiceCancelationPolicy])
  cancelationPolicies: ServiceCancelationPolicy[];

  @Field(() => [Vehicle])
  vehicles: Vehicle[];
}
