import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveShoppingCartItemInput {
  @Field((type) => ID)
  itemId: string;
}
