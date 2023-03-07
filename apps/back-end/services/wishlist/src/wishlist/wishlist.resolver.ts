import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import {
  accountType,
  AuthorizationDecodedUser,
  ExtractPagination,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';

import { WishlistService } from './wishlist.service';
import { WishedItem, Wishlist } from './entities/wishlist.entity';
import { AddWishlistItemInput } from './dto/add-wishlist-item.input';
import { RemoveWishlistItemInput } from './dto/remove-wishlist-item.input';
import { AdminGetUserWishlistInput } from './dto';
import { PrismaService } from 'prismaService';

@Resolver(() => Wishlist)
@UseGuards(new GqlAuthorizationGuard([]))
export class WishlistResolver {
  constructor(
    private readonly wishlistService: WishlistService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [WishedItem])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  getUserWishelist(@Args('args') args: AdminGetUserWishlistInput) {
    const { skip, take } = ExtractPagination(args.pagination);

    return this.prisma.wishedItem.findMany({
      where: {
        userId: args.accountId,
      },
      skip,
      take,
    });
  }

  @Query((type) => Wishlist)
  MyWishlist(@GqlCurrentUser() user: AuthorizationDecodedUser) {
    return this.wishlistService.getWishlist(user.id);
  }

  @Mutation((type) => Boolean)
  AddWishlistItem(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('addWishlistItemInput') input: AddWishlistItemInput,
  ) {
    return this.wishlistService.addWishlistItem(user.id, input);
  }

  @Mutation((type) => Boolean)
  RemoveWishlistItem(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('removeWishlistItemInput') input: RemoveWishlistItemInput,
  ) {
    return this.wishlistService.removeWishlistItem(user.id, input);
  }
}
