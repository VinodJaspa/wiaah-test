import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { ShippingRule } from 'src/shipping-rules/entities/shipping-rule.entity';

@ObjectType()
export class ShippingSetting {
  @Field((type) => ID)
  id: string;

  @Field((type) => ID)
  shopId: string;

  @Field((type) => ID)
  ownerId: string;

  @Field((type) => [ShippingRule])
  shippingRules: ShippingRule[];
}
