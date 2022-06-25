import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWishlistItemInput {
  @Field((type) => ID)
  itemId: string;
}
