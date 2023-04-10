import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ShoppingCart, CartProduct } from '@entities';
import {
  Inject,
  OnModuleDestroy,
  OnModuleInit,
  UseGuards,
} from '@nestjs/common';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  KAFKA_MESSAGES,
  SERVICES,
} from 'nest-utils';
import {
  AddShoppingCartItemInput,
  ApplyVoucherInput,
  RemoveShoppingCartItemInput,
} from '@dto';
import { ClientKafka } from '@nestjs/microservices';

import { ShoppingCartService } from './shopping-cart.service';

type Hooks = OnModuleInit & OnModuleDestroy;

@Resolver(() => ShoppingCart)
@UseGuards(new GqlAuthorizationGuard([]))
export class ShoppingCartResolver implements Hooks {
  constructor(
    private readonly shoppingCartService: ShoppingCartService,
    @Inject(SERVICES.SHOPPING_CART_SERVICE.token)
    private readonly eventsClient: ClientKafka,
  ) {}

  @Query((type) => ShoppingCart)
  MyShoppingCart(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<ShoppingCart> {
    return this.shoppingCartService.getShoppingCartByOwnerId(user.id);
  }

  @Mutation((type) => ShoppingCart)
  clearShoppingCart(@GqlCurrentUser() user: AuthorizationDecodedUser) {
    return this.shoppingCartService.clearShoppingCart(user.id);
  }

  @Mutation((type) => CartProduct)
  addProductToCart(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('addItemToCartArgs') input: AddShoppingCartItemInput,
  ): Promise<CartProduct> {
    return this.shoppingCartService.addProduct(user, input);
  }

  @Mutation((type) => Boolean)
  removeProductFromCart(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('removeItemFromCartArgs') input: RemoveShoppingCartItemInput,
  ): Promise<boolean> {
    return this.shoppingCartService.removeShoppingCartProduct(user, input);
  }

  @Mutation((type) => ShoppingCart)
  applyVoucher(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('args') input: ApplyVoucherInput,
  ): Promise<ShoppingCart> {
    return this.shoppingCartService.applyVoucher(user.id, input);
  }

  async onModuleInit() {
    this.eventsClient.subscribeToResponseOf(KAFKA_MESSAGES.isProductAddable);
    this.eventsClient.subscribeToResponseOf(KAFKA_MESSAGES.isServiceAddable);
    this.eventsClient.subscribeToResponseOf(
      KAFKA_MESSAGES.VOUCHERS_MESSAGES.isApplyableVoucher,
    );
    await this.eventsClient.connect();
  }
  async onModuleDestroy() {
    await this.eventsClient.close();
  }
}
