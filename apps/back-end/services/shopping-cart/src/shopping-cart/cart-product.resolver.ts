import { CartItem, Product, ShippingRule } from '@entities';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ShoppingCartItemType } from '@prisma-client';
import { Service } from 'src/entities/extends';

@Resolver(() => CartItem)
export class CartProductResolver {
  @ResolveField(() => Service, { nullable: true })
  async service(@Parent() shoppingcartItem: CartItem) {
    if (shoppingcartItem.itemType === ShoppingCartItemType.product) return null;
    return {
      __typename: 'service',
      id: shoppingcartItem.itemId,
    };
  }

  @ResolveField(() => Product, { nullable: true })
  async product(@Parent() shoppingcartItem: CartItem) {
    if (shoppingcartItem.itemType === ShoppingCartItemType.service) return null;
    return {
      __typename: 'product',
      id: shoppingcartItem.itemId,
    };
  }

  @ResolveField(() => ShippingRule)
  shippingRule(@Parent() prod: CartItem) {
    return {
      __typename: 'ShippingRule',
      id: prod.shippingRuleId,
    };
  }
}
