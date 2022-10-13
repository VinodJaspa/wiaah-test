import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WishlistService } from './wishlist.service';
import { Wishlist } from './entities/wishlist.entity';
import { UseGuards } from '@nestjs/common';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { AddWishlistItemInput } from './dto/add-wishlist-item.input';
import { RemoveWishlistItemInput } from './dto/remove-wishlist-item.input';

@UseGuards(new GqlAuthorizationGuard([]))
@Resolver(() => Wishlist)
export class WishlistResolver {
  constructor(private readonly wishlistService: WishlistService) {}

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
