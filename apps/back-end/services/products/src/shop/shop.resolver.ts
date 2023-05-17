import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveReference,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import {
  Inject,
  NotFoundException,
  OnModuleInit,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  GqlAuthorizationGuard,
  GqlCurrentUser,
  AuthorizationDecodedUser,
  SERVICES,
  KAFKA_MESSAGES,
  GetLang,
  UserPreferedLang,
  accountType,
} from 'nest-utils';
import { ClientKafka } from '@nestjs/microservices';

import { ShopService } from './shop.service';
import { RawShop, Shop } from './entities/shop.entity';
import { CreateShopInput } from './dto/create-shop.input';
import { GetNearShopsInput } from './dto/get-near-shops.dto';
import { FilteredShopsInput } from './dto/filter-shops.input';
import { UpdateUserShopInput } from './dto';
import { PrismaService } from 'prismaService';
import { ShopWorkingSchedule } from 'src/working-schedule/entities';
import { Profile } from './entities/extends';

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
  async getUserShop(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('userId') id: string,
    @GetLang() lang: UserPreferedLang,
  ) {
    await this.validateShopPremissions(user, id);

    return this.shopService.getShopByOwnerId(id, lang);
  }

  @Query(() => RawShop)
  @UseGuards(new GqlAuthorizationGuard([accountType.SELLER]))
  async getUserRawShop(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('userId') id: string,
  ): Promise<RawShop> {
    await this.validateShopEditPremissions(user, id);

    return this.prisma.shop.findUnique({
      where: {
        ownerId: id,
      },
    });
  }

  @Query(() => [Shop])
  getFilteredShops(
    @Args('filteredShopsArgs') filteredShopsInput: FilteredShopsInput,
    @GetLang() lang: UserPreferedLang,
  ) {
    return this.shopService.getFilteredShops(filteredShopsInput, lang);
  }

  @Mutation(() => Shop)
  @UseGuards(new GqlAuthorizationGuard([accountType.SELLER]))
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
  async updateShop(
    @Args('args') input: UpdateUserShopInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @GetLang() lang: UserPreferedLang,
  ) {
    await this.validateShopEditPremissions(user, input.userId);
    return this.shopService.updateShopData(input, input.userId, lang);
  }

  async validateShopPremissions(
    user: AuthorizationDecodedUser,
    userId: string,
  ) {
    const shop = await this.shopService.getShopByOwnerId(userId, 'en');

    if (shop.status === 'active') throw new NotFoundException('shop not found');

    return shop;
  }

  async validateShopEditPremissions(
    user: AuthorizationDecodedUser,
    userId: string,
  ) {
    if (user.id !== userId && user.accountType !== accountType.ADMIN)
      throw new UnauthorizedException('Invalid Premissions');
  }

  @ResolveReference()
  shop(
    ref: { __typename: string; id: string; name: string; ownerId: string },
    @GetLang() lang: UserPreferedLang,
  ) {
    return this.shopService.getShopById(ref.id, lang);
  }

  @ResolveField(() => ShopWorkingSchedule)
  workingSchedule(@Parent() shop: Shop) {
    return this.prisma.serviceWorkingSchedule.findUnique({
      where: {
        sellerId: shop.ownerId,
      },
    });
  }

  // @ResolveField(() => Profile)
  // profile(@Parent() shop: Shop) {
  //   return {
  //     __typename: 'Profile',
  //     userId: shop.ownerId,
  //   };
  // }

  async onModuleInit() {
    this.eventsClient.subscribeToResponseOf(KAFKA_MESSAGES.emailExists);
    this.eventsClient.subscribeToResponseOf(KAFKA_MESSAGES.getAccountByEmail);
    await this.eventsClient.connect();
  }
}
