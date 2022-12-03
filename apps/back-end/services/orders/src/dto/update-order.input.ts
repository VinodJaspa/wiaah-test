import { placeOrderInput } from '@dto';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateOrderInput extends PartialType(placeOrderInput) {
  @Field(() => ID)
  id: string;
}
