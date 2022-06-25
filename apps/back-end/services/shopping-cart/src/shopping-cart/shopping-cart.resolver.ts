import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ShoppingCartService } from './shopping-cart.service';
import { CartItem, ShoppingCart } from './entities/shopping-cart.entity';
import { CreateShoppingCartInput } from './dto/create-shopping-cart.input';
import { BadRequestException, UseGuards } from '@nestjs/common';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { AddShoppingCartItemInput } from './dto/addItem.input';
import { GraphQLError } from 'graphql';
import { RemoveShoppingCartItemInput } from './dto/removeItem.input';

@Resolver(() => ShoppingCart)
export class ShoppingCartResolver {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Query((type) => ShoppingCart)
  @UseGuards(GqlAuthorizationGuard)
  MyShoppingCart(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<ShoppingCart> {
    return this.shoppingCartService.getShoppingCartByOwnerId(user.id);
  }

  @Query((type) => [ShoppingCart])
  findAll(): Promise<ShoppingCart[]> {
    return this.shoppingCartService.getShoppingCarts();
  }

  @Mutation((type) => ShoppingCart)
  @UseGuards(GqlAuthorizationGuard)
  addItemToCart(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('addItemToCartArgs') input: AddShoppingCartItemInput,
  ): Promise<CartItem> {
    switch (input.itemType) {
      case 'product':
        return this.shoppingCartService.addProduct(user, input);
      case 'service':
        return this.shoppingCartService.addService(user, input);
      default:
        throw new BadRequestException('invalid item type');
    }
  }

  @Mutation((type) => Boolean)
  @UseGuards(GqlAuthorizationGuard)
  removeItemFromCart(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('removeItemFromCartArgs') input: RemoveShoppingCartItemInput,
  ): Promise<boolean> {
    return this.shoppingCartService.removeItem(user, input);
  }
}
