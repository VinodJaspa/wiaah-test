import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ShopDayWorkingHours {
  @Field(() => [String])
  periods: Date[];
}
