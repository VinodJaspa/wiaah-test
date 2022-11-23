import { Field, ObjectType } from '@nestjs/graphql';
import { ServiceDayWorkingHours } from './service-day-working-hours.entity';

@ObjectType()
export class SpecialDayWorkingHours {
  @Field(() => String)
  date: Date;

  @Field(() => ServiceDayWorkingHours)
  workingHours: ServiceDayWorkingHours;
}
