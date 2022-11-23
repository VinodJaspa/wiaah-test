import { Field, ObjectType } from '@nestjs/graphql';
import { ServiceDayWorkingHours } from './service-day-working-hours.entity';

@ObjectType()
export class WeekdaysWorkingHours {
  @Field(() => ServiceDayWorkingHours, { nullable: true })
  mo: ServiceDayWorkingHours;

  @Field(() => ServiceDayWorkingHours, { nullable: true })
  tu: ServiceDayWorkingHours;

  @Field(() => ServiceDayWorkingHours, { nullable: true })
  we: ServiceDayWorkingHours;

  @Field(() => ServiceDayWorkingHours, { nullable: true })
  th: ServiceDayWorkingHours;

  @Field(() => ServiceDayWorkingHours, { nullable: true })
  fr: ServiceDayWorkingHours;

  @Field(() => ServiceDayWorkingHours, { nullable: true })
  sa: ServiceDayWorkingHours;

  @Field(() => ServiceDayWorkingHours, { nullable: true })
  su: ServiceDayWorkingHours;
}
