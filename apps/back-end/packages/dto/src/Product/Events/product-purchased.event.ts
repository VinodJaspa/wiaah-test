import { KafkaMessage } from "../../Base";

export class ProductPurchasedEvent extends KafkaMessage<{
  productId: string;
  purchaserId: string;
  sellerId: string;
}> {}
