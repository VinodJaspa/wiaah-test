import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Order } from '@entities';

@ObjectType()
@Directive('@key(fields: "id,shopId,sellerId")')
export class OrdersCluster {
  @Field((type) => ID)
  id: string;

  @Field((type) => ID)
  shopId: string;

  @Field((type) => ID)
  sellerId: string;

  @Field((type) => [Order])
  orders: Order[];
}
