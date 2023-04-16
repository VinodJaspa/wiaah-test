import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { ShopSpecialDayWorkingHours } from './service-special-working-hours.entity';
import { ShopWeekdaysWorkingHours } from './week-days-working-hours.entity';

@ObjectType()
@Directive('@key(fields:"id")')
export class ShopWorkingSchedule {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  sellerId: string;

  @Field(() => ShopWeekdaysWorkingHours)
  weekdays: ShopWeekdaysWorkingHours;

  @Field(() => [ShopSpecialDayWorkingHours])
  specialDays: ShopSpecialDayWorkingHours[];
}
