import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class ServiceDayWorkingHoursInput {
  @Field(() => [String])
  periods: string[];
}

@InputType()
export class WeekdaysWorkingHoursInput {
  @Field(() => ServiceDayWorkingHoursInput)
  mo: ServiceDayWorkingHoursInput;

  @Field(() => ServiceDayWorkingHoursInput)
  tu: ServiceDayWorkingHoursInput;

  @Field(() => ServiceDayWorkingHoursInput)
  we: ServiceDayWorkingHoursInput;

  @Field(() => ServiceDayWorkingHoursInput)
  th: ServiceDayWorkingHoursInput;

  @Field(() => ServiceDayWorkingHoursInput)
  fr: ServiceDayWorkingHoursInput;

  @Field(() => ServiceDayWorkingHoursInput)
  sa: ServiceDayWorkingHoursInput;

  @Field(() => ServiceDayWorkingHoursInput)
  su: ServiceDayWorkingHoursInput;
}

@InputType()
export class SpecialDayWorkingHoursInput {
  @Field(() => String)
  date: string;

  @Field(() => ServiceDayWorkingHoursInput)
  workingHours: ServiceDayWorkingHoursInput;
}

@InputType()
export class CreateWorkingScheduleInput {
  @Field(() => WeekdaysWorkingHoursInput)
  weekdays: WeekdaysWorkingHoursInput;

  @Field(() => [SpecialDayWorkingHoursInput])
  specialDays: SpecialDayWorkingHoursInput[];
}
