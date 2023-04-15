import { Field, ObjectType } from '@nestjs/graphql';
import { ShopDayWorkingHours } from './service-day-working-hours.entity';

@ObjectType()
export class ShopSpecialDayWorkingHours {
  @Field(() => String)
  date: Date;

  @Field(() => ShopDayWorkingHours)
  workingHours: ShopDayWorkingHours;
}
