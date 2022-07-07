import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ShoppingCartService } from './shopping-cart.service';
import { CartItem, ShoppingCart } from '@entities';
import {
  BadRequestException,
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
  KAFKA_SERVICE_TOKEN,
  SERVICES,
} from 'nest-utils';
import {
  AddShoppingCartItemInput,
  ApplyVoucherInput,
  RemoveShoppingCartItemInput,
} from '@dto';
import { ClientKafka } from '@nestjs/microservices';

type Hooks = OnModuleInit & OnModuleDestroy;

@Resolver(() => ShoppingCart)
@UseGuards(GqlAuthorizationGuard)
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

  @Query((type) => [ShoppingCart])
  getAllShoppingCarts(): Promise<ShoppingCart[]> {
    return this.shoppingCartService.getShoppingCarts();
  }

  @Mutation((type) => ShoppingCart)
  clearShoppingCart(@GqlCurrentUser() user: AuthorizationDecodedUser) {
    return this.shoppingCartService.clearShoppingCart(user.id);
  }

  @Mutation((type) => CartItem)
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
  removeItemFromCart(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('removeItemFromCartArgs') input: RemoveShoppingCartItemInput,
  ): Promise<boolean> {
    return this.shoppingCartService.removeItem(user, input);
  }

  @Mutation((type) => ShoppingCart)
  applyVoucher(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('applyVoucherCode') input: ApplyVoucherInput,
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
    await this.eventsClient.connect();
    await this.eventsClient.connect();
  }
  async onModuleDestroy() {
    await this.eventsClient.close();
    await this.eventsClient.close();
    await this.eventsClient.close();
  }
}
