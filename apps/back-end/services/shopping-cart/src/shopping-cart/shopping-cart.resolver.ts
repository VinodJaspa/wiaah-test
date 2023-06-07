import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ShoppingCart, CartItem } from '@entities';
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
  NoReadPremissionPublicError,
  SERVICES,
  accountType,
} from 'nest-utils';
import {
  AddShoppingCartItemInput,
  ApplyVoucherInput,
  RemoveShoppingCartItemInput,
} from '@dto';
import { ClientKafka } from '@nestjs/microservices';

import { ShoppingCartService } from './shopping-cart.service';
import { PrismaService } from 'prismaService';
import { Service } from 'src/entities/extends';
import { ShoppingCartItemType } from '@prisma-client';

type Hooks = OnModuleInit & OnModuleDestroy;

@Resolver(() => ShoppingCart)
@UseGuards(new GqlAuthorizationGuard([]))
export class ShoppingCartResolver implements Hooks {
  constructor(
    private readonly shoppingCartService: ShoppingCartService,
    @Inject(SERVICES.SHOPPING_CART_SERVICE.token)
    private readonly eventsClient: ClientKafka,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => ShoppingCart)
  MyShoppingCart(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<ShoppingCart> {
    return this.shoppingCartService.getShoppingCartByOwnerId(user.id);
  }

  @Query(() => [CartItem])
  async getUserShoppingCartItems(
    @Args('userId') userId: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<CartItem[]> {
    await this.validateReadPremission(user, userId);
    const res = await this.prisma.cartItem.findMany({
      where: {
        ownerId: userId,
      },
    });

    return res;
  }

  @Mutation(() => ShoppingCart)
  clearShoppingCart(@GqlCurrentUser() user: AuthorizationDecodedUser) {
    return this.shoppingCartService.clearShoppingCart(user.id);
  }

  @Mutation(() => CartItem)
  addProductToCart(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('addItemToCartArgs') input: AddShoppingCartItemInput,
  ): Promise<CartItem> {
    return this.shoppingCartService.addProduct(user, input);
  }

  @Mutation(() => Boolean)
  removeProductFromCart(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('removeItemFromCartArgs') input: RemoveShoppingCartItemInput,
  ): Promise<boolean> {
    return this.shoppingCartService.removeShoppingCartItem(user, input);
  }

  @Mutation(() => ShoppingCart)
  applyVoucher(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('args') input: ApplyVoucherInput,
  ): Promise<ShoppingCart> {
    return this.shoppingCartService.applyVoucher(user.id, input);
  }

  validateReadPremission(user: AuthorizationDecodedUser, ownerId: string) {
    if (user.accountType !== accountType.ADMIN && user.id !== ownerId)
      throw new NoReadPremissionPublicError();
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
