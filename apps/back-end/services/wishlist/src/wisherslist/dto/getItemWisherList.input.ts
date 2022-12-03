import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class GetItemWishersListInput {
  @Field(() => ID)
  itemId: string;
}
