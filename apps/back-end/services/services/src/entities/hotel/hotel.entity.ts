import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import {
  ServicePresentation,
  ServicePolicy,
  ServiceMetaInfo,
  ServiceLocation,
} from '@entities';
import { HotelRoom } from './hotelRoom.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"id")')
export class WorkingSchedule {
  @Field(() => ID)
  @Directive('@external')
  id: string;
}

@ObjectType()
export class Hotel {
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

  // @Field(() => WorkingSchedule, { nullable: false })
  // workingHours?: WorkingSchedule;
}
