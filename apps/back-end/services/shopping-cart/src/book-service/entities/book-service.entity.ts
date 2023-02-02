import { ObjectType, Field, Int, ID, Directive } from '@nestjs/graphql';
import { BookedServiceStatus } from '@prisma-client';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"id")')
export class HotelRoom {
  @Field(() => ID)
  @Directive('@external')
  id: string;
}

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"id")')
export class Restaurant {
  @Field(() => ID)
  @Directive('@external')
  id: string;
}

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"id")')
export class HealthCenter {
  @Field(() => ID)
  @Directive('@external')
  id: string;
}

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"id")')
export class BeautyCenter {
  @Field(() => ID)
  @Directive('@external')
  id: string;
}

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"id")')
export class Vehicle {
  @Field(() => ID)
  @Directive('@external')
  id: string;
}

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"id")')
export class Treatment {
  @Field(() => ID)
  @Directive('@external')
  id: string;
}

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"id")')
export class Dish {
  @Field(() => ID)
  @Directive('@external')
  id: string;
}

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"id")')
export class Doctor {
  @Field(() => ID)
  @Directive('@external')
  id: string;
}

@ObjectType()
export class BookedService {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  serviceId: string;

  @Field(() => ID)
  ownerId: string;

  @Field(() => String)
  type: string;

  @Field(() => ID)
  providerId: string;

  @Field(() => BookedServiceStatus)
  status: BookedServiceStatus;

  @Field(() => String, { nullable: true })
  payment?: string;

  @Field(() => Date)
  checkin: Date;

  @Field(() => Date, { nullable: true })
  checkout?: Date;

  @Field(() => Int, { nullable: true })
  duration?: number;

  @Field(() => Int)
  guests: number;

  @Field(() => ID)
  cancelationPolicyId: string;

  @Field(() => [ID], { nullable: true })
  dishsIds?: string[];

  @Field(() => [ID], { nullable: true })
  extrasIds?: string[];

  @Field(() => [ID], { nullable: true })
  treatmentsIds?: string[];

  @Field(() => ID, { nullable: true })
  roomId?: string;

  @Field(() => ID, { nullable: true })
  doctorId?: string;

  @Field(() => HotelRoom, { nullable: true })
  room?: HotelRoom;

  @Field(() => Restaurant, { nullable: true })
  restaurant?: Restaurant;

  @Field(() => HealthCenter, { nullable: true })
  healthCenter?: HealthCenter;

  @Field(() => BeautyCenter, { nullable: true })
  beautyCenter?: BeautyCenter;

  @Field(() => Vehicle, { nullable: true })
  vehicle?: Vehicle;
}
