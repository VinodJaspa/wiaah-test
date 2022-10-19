import {
  ServiceCancelationPolicy,
  ServiceMetaInfo,
  ServicePolicy,
  ServicePresentation,
} from '@entities';
import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { ServicePaymentMethods, ServiceStatus } from 'prismaClient';
import { HealthCenterDoctor } from './health-center-doctor.entity';

@ObjectType()
export class HealthCenter {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  ownerId: string;

  @Field(() => Float)
  vat: number;

  @Field(() => Float)
  rating: number;

  @Field(() => Int)
  totalReviews: number;

  @Field(() => ServiceStatus)
  status: ServiceStatus;

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

  @Field(() => [HealthCenterDoctor])
  doctors: HealthCenterDoctor[];
}
