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
    @Inject(SERVICES.PRODUCTS_SERVICE.token)
    private readonly productsClient: ClientKafka,
    @Inject(SERVICES.SERVICES_SERIVCE.token)
    private readonly serviceClient: ClientKafka,
    @Inject(SERVICES.VOUCHERS_SERVICE.token)
    private readonly vouchersClient: ClientKafka,
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
    this.productsClient.subscribeToResponseOf(KAFKA_MESSAGES.isProductAddable);
    this.serviceClient.subscribeToResponseOf(KAFKA_MESSAGES.isServiceAddable);
    this.vouchersClient.subscribeToResponseOf(
      KAFKA_MESSAGES.VOUCHERS_MESSAGES.isApplyableVoucher,
    );
    await this.vouchersClient.connect();
    await this.serviceClient.connect();
    await this.productsClient.connect();
  }
  async onModuleDestroy() {
    await this.productsClient.close();
    await this.serviceClient.close();
    await this.productsClient.close();
  }
}
