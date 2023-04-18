import { Field, InputType } from '@nestjs/graphql';

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

  // @Field(()=> )
}
