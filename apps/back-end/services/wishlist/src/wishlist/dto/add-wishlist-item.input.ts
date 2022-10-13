import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class AddWishlistItemInput {
  @Field((type) => ID)
  itemId: string;

  @Field(() => ID)
  sellerId: string;
}
