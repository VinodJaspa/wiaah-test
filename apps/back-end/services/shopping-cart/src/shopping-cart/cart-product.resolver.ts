import { CartProduct, Product, ShippingRule } from '@entities';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

@Resolver(() => CartProduct)
export class CartProductResolver {
  @ResolveField(() => Product, { nullable: true })
  product(@Parent() prod: CartProduct) {
    return {
      __typename: 'Product',
      id: prod.id,
    };
  }

  @ResolveField(() => ShippingRule)
  shippingRule(@Parent() prod: CartProduct) {
    return {
      __typename: 'ShippingRule',
      id: prod.shippingRuleId,
    };
  }
}
