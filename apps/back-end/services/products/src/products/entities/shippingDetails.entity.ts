import { Directive, Field, ObjectType } from '@nestjs/graphql';

// @ObjectType()
// @Directive('@key(fields: "country,shippingRulesIds")')
export class ShippingDetails {
  @Field((type) => String)
  @Directive('@external')
  country: string;

  @Field((type) => [String])
  @Directive('@external')
  shippingRulesIds: string[];
}
