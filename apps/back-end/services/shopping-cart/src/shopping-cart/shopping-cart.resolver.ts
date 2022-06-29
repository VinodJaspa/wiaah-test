import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ShoppingCartService } from './shopping-cart.service';
import { CartItem, ShoppingCart } from './entities/shopping-cart.entity';
import { CreateShoppingCartInput } from './dto/create-shopping-cart.input';
import {
  BadRequestException,
  Inject,
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
import { AddShoppingCartItemInput } from './dto/addItem.input';
import { RemoveShoppingCartItemInput } from './dto/removeItem.input';
import { ClientKafka } from '@nestjs/microservices';

@Resolver(() => ShoppingCart)
export class ShoppingCartResolver implements OnModuleInit {
  constructor(
    private readonly shoppingCartService: ShoppingCartService,
    @Inject(SERVICES.PRODUCTS_SERVICE.token)
    private readonly productsClient: ClientKafka,
    @Inject(SERVICES.SERVICES_SERIVCE.token)
    private readonly serviceClient: ClientKafka,
  ) {}

  @Query((type) => ShoppingCart)
  @UseGuards(GqlAuthorizationGuard)
  MyShoppingCart(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<ShoppingCart> {
    return this.shoppingCartService.getShoppingCartByOwnerId(user.id);
  }

  @Query((type) => [ShoppingCart])
  getAllShoppingCarts(): Promise<ShoppingCart[]> {
    return this.shoppingCartService.getShoppingCarts();
  }

  @Mutation((type) => ShoppingCart)
  @UseGuards(GqlAuthorizationGuard)
  clearShoppingCart(@GqlCurrentUser() user: AuthorizationDecodedUser) {
    return this.shoppingCartService.clearShoppingCart(user.id);
  }

  @Mutation((type) => CartItem)
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

  async onModuleInit() {
    this.productsClient.subscribeToResponseOf(KAFKA_MESSAGES.isProductAddable);
    this.serviceClient.subscribeToResponseOf(KAFKA_MESSAGES.isServiceAddable);
    await this.serviceClient.connect();
    await this.productsClient.connect();
  }
}
