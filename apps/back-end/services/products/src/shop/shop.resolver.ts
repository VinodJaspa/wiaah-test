import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveReference,
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
import { FilterShopsInput } from './dto/filter-shops.input';

@Resolver(() => Shop)
export class ShopResolver implements OnModuleInit {
  constructor(
    private readonly shopService: ShopService,
    @Inject(SERVICES.SHOP_SERVICE.token)
    private readonly eventsClient: ClientKafka,
  ) {}
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

  @Query(() => [Shop])
  getFilteredShops(
    @Args('filteredShopsArgs') filteredShopsInput: FilterShopsInput,
  ) {
    return this.shopService.getFilteredShops(filteredShopsInput);
  }

  @UseGuards(new GqlAuthorizationGuard(['seller']))
  @Mutation(() => Shop)
  createShop(
    @Args('createShopInput') createShopInput: CreateShopInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.shopService.CreateShop(createShopInput, user);
  }

  @Mutation((type) => Boolean)
  removeAllShops() {
    return this.shopService.removeAllShops();
  }

  @ResolveReference()
  shop(ref: { __typename: string; id: string }) {
    return this.shopService.getShopById(ref.id);
  }

  async onModuleInit() {
    this.eventsClient.subscribeToResponseOf(KAFKA_MESSAGES.emailExists);
    this.eventsClient.subscribeToResponseOf(KAFKA_MESSAGES.getAccountByEmail);
    await this.eventsClient.connect();
  }
}
