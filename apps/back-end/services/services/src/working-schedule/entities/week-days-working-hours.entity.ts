import { Field, ObjectType } from '@nestjs/graphql';
import { ServiceServiceDayWorkingHours } from './service-day-working-hours.entity';

@ObjectType()
export class ServiceWeekdaysWorkingHours {
  @Field(() => ServiceServiceDayWorkingHours, { nullable: true })
  mo: ServiceServiceDayWorkingHours;

  @Field(() => ServiceServiceDayWorkingHours, { nullable: true })
  tu: ServiceServiceDayWorkingHours;

  @Field(() => ServiceServiceDayWorkingHours, { nullable: true })
  we: ServiceServiceDayWorkingHours;

  @Field(() => ServiceServiceDayWorkingHours, { nullable: true })
  th: ServiceServiceDayWorkingHours;

  @Field(() => ServiceServiceDayWorkingHours, { nullable: true })
  fr: ServiceServiceDayWorkingHours;

  @Field(() => ServiceServiceDayWorkingHours, { nullable: true })
  sa: ServiceServiceDayWorkingHours;

  @Field(() => ServiceServiceDayWorkingHours, { nullable: true })
  su: ServiceServiceDayWorkingHours;
}
