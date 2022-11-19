import { Directive, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"country, shippingRulesIds")')
export class ShippingDetails {
  @Field(() => String)
  @Directive('@external')
  country: string;

  @Field(() => [String])
  @Directive('@external')
  shippingRulesIds: string[];
}
