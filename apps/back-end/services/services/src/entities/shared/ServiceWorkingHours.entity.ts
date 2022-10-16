import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ServiceDayWorkingHours {
  @Field(() => [Date])
  periods: Date[];
}

@ObjectType()
export class ServiceWeekDaysWorkingHours {
  @Field(() => ServiceDayWorkingHours)
  mo: ServiceDayWorkingHours;

  @Field(() => ServiceDayWorkingHours)
  tu: ServiceDayWorkingHours;

  @Field(() => ServiceDayWorkingHours)
  we: ServiceDayWorkingHours;

  @Field(() => ServiceDayWorkingHours)
  th: ServiceDayWorkingHours;

  @Field(() => ServiceDayWorkingHours)
  fr: ServiceDayWorkingHours;

  @Field(() => ServiceDayWorkingHours)
  sa: ServiceDayWorkingHours;

  @Field(() => ServiceDayWorkingHours)
  su: ServiceDayWorkingHours;
}
