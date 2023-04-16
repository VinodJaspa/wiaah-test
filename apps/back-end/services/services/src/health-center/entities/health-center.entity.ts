import {
  Account,
  ServiceCancelationPolicy,
  ServiceContact,
  ServiceLocation,
  ServiceMetaInfo,
  ServicePolicy,
  ServicePresentation,
} from '@entities';
import { ObjectType, Field, Int, ID, Float, Directive } from '@nestjs/graphql';
import { ServiceWorkingSchedule } from '@working-schedule/entities';
import { ServicePaymentMethods, ServiceStatus } from 'prismaClient';
import { Doctor } from './health-center-doctor.entity';

@ObjectType()
@Directive('@key(fields:"id")')
export class HealthCenter {
  @Field(() => Account, { nullable: true })
  owner?: Account;

  @Field(() => ServiceContact)
  contact: ServiceContact;

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

  @Field(() => ServiceLocation)
  location: ServiceLocation;

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

  @Field(() => [Doctor])
  doctors: Doctor[];
}
