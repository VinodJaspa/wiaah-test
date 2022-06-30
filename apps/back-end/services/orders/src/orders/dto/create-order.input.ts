import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
class OrderItemInput {
  @Field((type) => ID)
  itemId: string;

  @Field((type) => Int)
  quantity: number;
}

@InputType()
export class CreateOrderInput {
  @Field((type) => [OrderItemInput])
  items: OrderItemInput[];
}
