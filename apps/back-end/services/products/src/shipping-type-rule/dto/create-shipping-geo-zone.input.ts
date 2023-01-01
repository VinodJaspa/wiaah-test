import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateShippingGeoZone {
  @Field(() => String)
  country: string;

  @Field(() => String)
  zone: string;

  @Field(() => ID)
  shippingTypeRuleId: string;
}
