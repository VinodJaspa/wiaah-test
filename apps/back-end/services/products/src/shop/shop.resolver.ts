import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveReference,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import {
  GqlAuthorizationGuard,
  GqlCurrentUser,
  AuthorizationDecodedUser,
  SERVICES,
  KAFKA_MESSAGES,
  GetLang,
  UserPreferedLang,
} from 'nest-utils';
import { ClientKafka } from '@nestjs/microservices';

import { ShopService } from './shop.service';
import { Shop } from './entities/shop.entity';
import { CreateShopInput } from './dto/create-shop.input';
import { GetNearShopsInput } from './dto/get-near-shops.dto';
import { FilteredShopsInput } from './dto/filter-shops.input';
import { UpdateShopInput } from './dto';
import { PrismaService } from 'prismaService';
import { Service } from './entities/extends/service.extends.entity';

@Resolver(() => Shop)
export class ShopResolver implements OnModuleInit {
  constructor(
    private readonly shopService: ShopService,
    @Inject(SERVICES.SHOP_SERVICE.token)
    private readonly eventsClient: ClientKafka,
    private readonly prisma: PrismaService,
  ) {}
  @Query((type) => [Shop])
  getNearShops(
    @Args('GetNearShopsInput') getNearShopsInput: GetNearShopsInput,
    @GetLang() langId: UserPreferedLang,
  ) {
    return this.shopService.getNearShops(getNearShopsInput, langId);
  }

  @Query(() => Shop)
  getShopById(@Args('id') id: string, @GetLang() lang: UserPreferedLang) {
    return this.shopService.getShopById(id, lang);
  }

  @Query(() => [Shop])
  getFilteredShops(
    @Args('filteredShopsArgs') filteredShopsInput: FilteredShopsInput,
    @GetLang() lang: UserPreferedLang,
  ) {
    return this.shopService.getFilteredShops(filteredShopsInput, lang);
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

  @Mutation(() => Shop)
  updateMyShop(
    @Args('updateMyShopInput') input: UpdateShopInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @GetLang() lang: UserPreferedLang,
  ) {
    return this.shopService.updateShopData(input, user.id, lang);
  }

  @ResolveReference()
  shop(
    ref: { __typename: string; id: string; name: string; ownerId: string },
    @GetLang() lang: UserPreferedLang,
  ) {
    return this.shopService.getShopById(ref.id, lang);
  }

  @ResolveField(() => Service)
  service(@Parent() shop: Shop) {
    return {
      __typename: 'Service',
      ownerId: shop.ownerId,
    };
  }

  async onModuleInit() {
    this.eventsClient.subscribeToResponseOf(KAFKA_MESSAGES.emailExists);
    this.eventsClient.subscribeToResponseOf(KAFKA_MESSAGES.getAccountByEmail);
    await this.eventsClient.connect();
  }
}
