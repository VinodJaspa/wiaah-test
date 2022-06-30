import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OrderItem {
  @Field((type) => ID)
  itemId: string;

  @Field((type) => Int)
  quantity: number;
}
