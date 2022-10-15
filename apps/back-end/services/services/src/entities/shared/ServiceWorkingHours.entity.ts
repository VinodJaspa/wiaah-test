import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ServiceDayWorkingHours {
  @Field(() => [Date])
  periods: Date[];
}

@ObjectType()
export class ServiceWeekDaysWorkingHours {
  @Field(() => ServiceDayWorkingHours)
  0: ServiceDayWorkingHours;

  @Field(() => ServiceDayWorkingHours)
  1: ServiceDayWorkingHours;

  @Field(() => ServiceDayWorkingHours)
  2: ServiceDayWorkingHours;

  @Field(() => ServiceDayWorkingHours)
  3: ServiceDayWorkingHours;

  @Field(() => ServiceDayWorkingHours)
  4: ServiceDayWorkingHours;

  @Field(() => ServiceDayWorkingHours)
  5: ServiceDayWorkingHours;

  @Field(() => ServiceDayWorkingHours)
  6: ServiceDayWorkingHours;
}
