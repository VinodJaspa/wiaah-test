import { Field, ObjectType } from '@nestjs/graphql';
import { ShopDayWorkingHours } from './service-day-working-hours.entity';

@ObjectType()
export class ShopWeekdaysWorkingHours {
  @Field(() => ShopDayWorkingHours, { nullable: true })
  mo: ShopDayWorkingHours;

  @Field(() => ShopDayWorkingHours, { nullable: true })
  tu: ShopDayWorkingHours;

  @Field(() => ShopDayWorkingHours, { nullable: true })
  we: ShopDayWorkingHours;

  @Field(() => ShopDayWorkingHours, { nullable: true })
  th: ShopDayWorkingHours;

  @Field(() => ShopDayWorkingHours, { nullable: true })
  fr: ShopDayWorkingHours;

  @Field(() => ShopDayWorkingHours, { nullable: true })
  sa: ShopDayWorkingHours;

  @Field(() => ShopDayWorkingHours, { nullable: true })
  su: ShopDayWorkingHours;
}
