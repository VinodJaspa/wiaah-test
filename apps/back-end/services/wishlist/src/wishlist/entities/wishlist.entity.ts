import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { WishlistItemType } from '@prisma-client';

registerEnumType(WishlistItemType, { name: 'WishlistItemType' });

@ObjectType()
export class Wishlist {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  ownerId: string;

  @Field(() => [WishlistItem])
  wishedItems: WishlistItem[];
}

@ObjectType()
export class WishlistItem {
  @Field(() => ID)
  itemId: string;

  @Field(() => WishlistItemType)
  itemType: WishlistItemType;
}
