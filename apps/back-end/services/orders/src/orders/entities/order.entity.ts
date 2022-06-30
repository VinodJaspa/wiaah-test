import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql';
import { BuyerInfo } from './buyer-info.entity';
import { OrderItem } from './orderItem.entity';
import { OrderStatus } from './orderStauts.entity';
import { SellerInfo } from './seller-info.entity';

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
