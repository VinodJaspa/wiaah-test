import {
  Account,
  ServiceCancelationPolicy,
  ServiceContact,
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
  Float,
  registerEnumType,
  Directive,
} from '@nestjs/graphql';
import { ServiceWorkingSchedule } from '@working-schedule/entities';
import {
  ServicePaymentMethods,
  ServiceStatus,
  ServiceTypeOfSeller,
} from 'prismaClient';
import { Treatment } from './beauty-center-treatment.entity';

registerEnumType(ServiceTypeOfSeller, { name: 'ServiceTypeOfSeller' });
registerEnumType(ServiceStatus, { name: 'ServiceStatus' });

@ObjectType()
@Directive('@key(fields:"id")')
export class BeautyCenter {
  @Field(() => ID)
  id: string;

  @Field(() => ServiceContact)
  contact: ServiceContact;

  @Field(() => ID)
  ownerId: string;

  @Field(() => Account, { nullable: true })
  owner?: Account;

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

  @Field(() => ID)
  beauty_center_typeId: string;

  @Field(() => ServiceStatus)
  status: ServiceStatus;

  @Field(() => String)
  title: string;

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

  @Field(() => [ServiceCancelationPolicy])
  cancelationPolicies: ServiceCancelationPolicy[];

  @Field(() => ServiceTypeOfSeller)
  type_of_seller: ServiceTypeOfSeller;

  @Field(() => [Treatment])
  treatments: Treatment[];

  @Field(() => ServiceWorkingSchedule, { nullable: true })
  workingHours?: ServiceWorkingSchedule;
}
