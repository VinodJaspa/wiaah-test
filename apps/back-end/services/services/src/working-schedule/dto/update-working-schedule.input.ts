import {
  SpecialDayWorkingHoursInput,
  WeekdaysWorkingHoursInput,
} from './create-working-schedule.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateWeekdaysWorkingHoursInput extends PartialType(
  WeekdaysWorkingHoursInput,
) {}

@InputType()
export class UpdateWorkingScheduleInput {
  @Field(() => UpdateWeekdaysWorkingHoursInput, { nullable: true })
  weekdays?: UpdateWeekdaysWorkingHoursInput;

  @Field(() => [SpecialDayWorkingHoursInput], { nullable: true })
  specialDays?: SpecialDayWorkingHoursInput[];
}
