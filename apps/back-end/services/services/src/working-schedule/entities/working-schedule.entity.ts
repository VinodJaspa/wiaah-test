import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { SpecialDayWorkingHours } from './service-special-working-hours.entity';
import { ServiceWeekdaysWorkingHours } from './week-days-working-hours.entity';

@ObjectType()
@Directive('@key(fields:"id")')
export class ServiceWorkingSchedule {
  @Field(() => ID)
  id: string;

  @Field(() => ServiceWeekdaysWorkingHours)
  weekdays: ServiceWeekdaysWorkingHours;

  @Field(() => [SpecialDayWorkingHours])
  specialDays: SpecialDayWorkingHours[];
}
