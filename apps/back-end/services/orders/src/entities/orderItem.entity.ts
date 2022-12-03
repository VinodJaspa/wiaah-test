import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OrderItem {
  @Field((type) => ID)
  id: string;

  @Field((type) => Int)
  qty: number;
}
