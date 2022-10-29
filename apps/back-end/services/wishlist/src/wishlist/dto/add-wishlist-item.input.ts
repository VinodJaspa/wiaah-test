import { Field, ID, InputType } from '@nestjs/graphql';
import { WishlistItemType } from '@prisma-client';

@InputType()
export class AddWishlistItemInput {
  @Field((type) => ID)
  itemId: string;

  @Field(() => ID)
  sellerId: string;

  @Field(() => WishlistItemType)
  itemType: WishlistItemType;
}
