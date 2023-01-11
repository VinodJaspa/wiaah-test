import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import {
  ServicePresentation,
  ServicePolicy,
  ServiceMetaInfo,
  ServiceLocation,
} from '@entities';
import { HotelRoom } from './hotelRoom.entity';
import { WorkingSchedule } from '@working-schedule/entities';

@ObjectType()
export class ServiceContact {
  @Field(() => String)
  address: string;

  @Field(() => String)
  country: string;

  @Field(() => String, { nullable: true })
  state: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  phone: string;
}

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"id")')
export class Account {
  @Field(() => ID)
  @Directive('@external')
  id: string;
}

@ObjectType()
export class Hotel {
  @Field(() => Account)
  owner?: Account;

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

  @Field(() => [HotelRoom])
  rooms: HotelRoom[];

  @Field(() => ServiceContact)
  contact: ServiceContact;

  @Field(() => WorkingSchedule, { nullable: false })
  workingHours?: WorkingSchedule;
}
