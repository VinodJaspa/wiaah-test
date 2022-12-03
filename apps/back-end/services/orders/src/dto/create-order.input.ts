import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
class OrderItemInput {
  @Field((type) => ID)
  id: string;

  @Field((type) => Int)
  qty: number;

  @Field(() => String)
  type: string;
}

@InputType()
export class placeOrderInput {
  @Field((type) => [OrderItemInput])
  items: OrderItemInput[];
}
