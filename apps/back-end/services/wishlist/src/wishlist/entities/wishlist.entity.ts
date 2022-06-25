import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Wishlist {
  @Field((type) => ID)
  id: string;

  @Field((type) => ID)
  ownerId: string;

  @Field((type) => [WishlistItem])
  wishedItems: WishlistItem[];
}

@ObjectType()
export class WishlistItem {
  @Field((type) => ID)
  itemId: string;
}
