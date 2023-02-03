import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { SpecialDayWorkingHours } from './service-special-working-hours.entity';
import { WeekdaysWorkingHours } from './week-days-working-hours.entity';

@ObjectType()
@Directive('@key(fields:"id")')
export class WorkingSchedule {
  @Field(() => ID)
  id: string;

  @Field(() => WeekdaysWorkingHours)
  weekdays: WeekdaysWorkingHours;

  @Field(() => [SpecialDayWorkingHours])
  specialDays: SpecialDayWorkingHours[];
}
