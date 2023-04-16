import { Field, ObjectType } from '@nestjs/graphql';
import { ServiceServiceDayWorkingHours } from './service-day-working-hours.entity';

@ObjectType()
export class SpecialDayWorkingHours {
  @Field(() => String)
  date: Date;

  @Field(() => ServiceServiceDayWorkingHours)
  workingHours: ServiceServiceDayWorkingHours;
}
