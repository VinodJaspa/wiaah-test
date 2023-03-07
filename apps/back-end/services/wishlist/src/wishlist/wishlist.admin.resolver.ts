import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { WishlistItemType } from '@prisma-client';
import { accountType, GqlAuthorizationGuard } from 'nest-utils';
import { PrismaService } from 'prismaService';
import { WishedItem, Wishlist } from './entities';
import { Product } from './entities/product.entity';
import { Service } from './entities/service.entity';

@Resolver(() => WishedItem)
@UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
export class WishedItemResolver {
  constructor(private readonly prisma: PrismaService) {}
  @Query(() => [WishedItem])
  adminGetUserWishlist(@Args('accountId') id: string) {
    return this.prisma.wishedItem.findMany({
      where: {
        userId: id,
      },
    });
  }

  @Mutation(() => Boolean)
  adminDeleteUserWishlistItem(@Args('accountId') id: string) {
    return this.prisma.wishedItem.delete({
      where: {
        id,
      },
    });
  }

  @ResolveField(() => Product)
  product(@Parent() item: WishedItem) {
    if (item.itemType !== WishlistItemType.product) return null;
    return {
      __typename: 'Product',
      id: item.itemId,
    };
  }

  @ResolveField(() => Service)
  service(@Parent() item: WishedItem) {
    if (item.itemType !== WishlistItemType.service) return null;
    return {
      __typename: 'Service',
      id: item.itemId,
    };
  }
}
