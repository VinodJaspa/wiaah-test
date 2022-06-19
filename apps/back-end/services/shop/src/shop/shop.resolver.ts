import {
  Resolver,
  Query,
  Parent,
  Mutation,
  Args,
  Int,
  ResolveField,
} from '@nestjs/graphql';
import { ShopService } from './shop.service';
import { Shop } from './entities/shop.entity';
import { CreateShopInput } from './dto/create-shop.input';
import { Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import {
  GqlAuthorizationGuard,
  GqlCurrentUser,
  AuthorizationDecodedUser,
  SERVICES,
  KAFKA_MESSAGES,
} from 'nest-utils';
import { ClientKafka } from '@nestjs/microservices';
import { GetNearShopsInput } from './dto/get-near-shops.dto';
import { Product } from './entities/product.entity';

@Resolver(() => Shop)
export class ShopResolver implements OnModuleInit {
  constructor(
    private readonly shopService: ShopService,
    @Inject(SERVICES.ACCOUNTS_SERVICE.token)
    private readonly accountsClient: ClientKafka,
  ) {}

  @UseGuards(GqlAuthorizationGuard)
  @Mutation(() => Shop)
  createShop(
    @Args('createShopInput') createShopInput: CreateShopInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.shopService.CreateShop(createShopInput, user);
  }

  @Mutation((type) => Boolean)
  createShopsPh() {
    return this.shopService.createPlaceholderShops();
  }

  @Mutation((type) => Boolean)
  removeAllShops() {
    return this.shopService.removeAllShops();
  }

  @Query((type) => [Shop])
  getNearShops(
    @Args('GetNearShopsInput') getNearShopsInput: GetNearShopsInput,
  ) {
    return this.shopService.getNearShops(getNearShopsInput);
  }

  @Query(() => [Shop])
  getAllShops() {
    return this.shopService.findAll();
  }

  @Query(() => Shop)
  getShopById(@Args('id') id: string) {
    return this.shopService.getShopById(id);
  }

  @ResolveField((of) => [Product])
  products(@Parent() shop: Shop) {
    return { __typename: 'Product', id: shop.id };
  }

  async onModuleInit() {
    this.accountsClient.subscribeToResponseOf(KAFKA_MESSAGES.isSellerAccount);
    await this.accountsClient.connect();
  }
}
