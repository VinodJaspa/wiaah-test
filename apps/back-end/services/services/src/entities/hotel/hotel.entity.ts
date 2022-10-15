import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  ServicePresentation,
  ServicePolicy,
  ServiceMetaInfo,
  HotelRoom,
  ServiceDayWorkingHours,
} from '@entities';

@ObjectType()
export class HotelService {
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

  @Field(() => ServiceDayWorkingHours, { nullable: false })
  workingHours: ServiceDayWorkingHours;
}
