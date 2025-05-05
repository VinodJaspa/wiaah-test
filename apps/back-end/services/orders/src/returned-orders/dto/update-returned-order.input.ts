import { CreateReturnedOrderInput } from './create-returned-order.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateReturnedOrderInput extends PartialType(
  CreateReturnedOrderInput,
) {
  @Field(() => Int)
  id: number;
}
