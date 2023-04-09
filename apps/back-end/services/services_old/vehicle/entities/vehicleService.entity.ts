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
} from '@nestjs/graphql';
import { WorkingSchedule } from '@working-schedule/entities';
import { ServicePaymentMethods } from 'prismaClient';
import { Vehicle } from './vehicle.entity';

registerEnumType(ServicePaymentMethods, { name: 'ServicePaymentMethod' });

@ObjectType()
export class VehicleService {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  ownerId: string;

  @Field(() => Account)
  owner: Account;

  @Field(() => WorkingSchedule)
  workingHours: WorkingSchedule;

  @Field(() => ServiceContact)
  contact: ServiceContact;

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
