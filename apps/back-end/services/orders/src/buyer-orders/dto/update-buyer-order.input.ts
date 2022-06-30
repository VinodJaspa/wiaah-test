import { CreateBuyerOrderInput } from './create-buyer-order.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBuyerOrderInput extends PartialType(CreateBuyerOrderInput) {
  @Field(() => Int)
  id: number;
}
