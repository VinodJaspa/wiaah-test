import { CreateShoppingCartInput } from './create-shopping-cart.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateShoppingCartInput extends PartialType(
  CreateShoppingCartInput,
) {
  @Field(() => Int)
  id: number;
}
