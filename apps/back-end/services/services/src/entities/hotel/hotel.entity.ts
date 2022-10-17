import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  ServicePresentation,
  ServicePolicy,
  ServiceMetaInfo,
  ServiceWeekDaysWorkingHours,
} from '@entities';
import { HotelRoom } from './hotelRoom.entity';

@ObjectType()
export class HotelServiceEntity {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  ownerId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => [ServicePresentation])
  presentations: ServicePresentation[];

  @Field(() => [ServicePolicy])
  policies: ServicePolicy[];

  @Field(() => ServiceMetaInfo)
  serviceMetaInfo: ServiceMetaInfo;

  @Field(() => [HotelRoom])
  rooms: HotelRoom[];

  @Field(() => ServiceWeekDaysWorkingHours, { nullable: false })
  workingHours?: ServiceWeekDaysWorkingHours;
}
