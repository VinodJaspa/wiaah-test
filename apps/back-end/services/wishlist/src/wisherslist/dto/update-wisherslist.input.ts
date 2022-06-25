import { CreateWisherslistInput } from './create-wisherslist.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateWisherslistInput extends PartialType(
  CreateWisherslistInput,
) {
  @Field(() => Int)
  id: number;
}
