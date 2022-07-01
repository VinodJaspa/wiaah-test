import { ObjectType, Field, ID } from '@nestjs/graphql';
import { OrderStatus, BuyerInfo, OrderItem, SellerInfo } from '@entities';

@ObjectType()
export class Order {
  @Field((type) => ID)
  id: string;

  @Field((type) => OrderItem)
  items: OrderItem[];

  @Field((type) => OrderStatus)
  status: OrderStatus;

  @Field((type) => SellerInfo)
  sellerInfo: SellerInfo;

  @Field((type) => BuyerInfo)
  buyerInfo: BuyerInfo;
}
