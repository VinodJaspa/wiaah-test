import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GetBookingCostInput {
  @Field(() => [String])
  servicesIds: string[];

  @Field(() => [String], { nullable: true })
  extrasIds: string[];

  @Field(() => String)
  checkinDate: string;

  @Field(() => String, { nullable: true })
  checkinTime?: string;

  @Field(() => String, { nullable: true })
  checkoutDate?: string;

  @Field(() => Int, { nullable: true })
  adults?: number;

  @Field(() => Int, { nullable: true })
  children?: number;
}
