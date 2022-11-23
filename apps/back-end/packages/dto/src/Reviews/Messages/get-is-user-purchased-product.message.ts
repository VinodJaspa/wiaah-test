import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetIsUserPurchasedProductMessage extends KafkaMessage<{
  userId: string;
  productId: string;
}> {}

export class GetIsUserPurchasedProductMessageReply extends KafkaMessageReply<{
  hasPurchased: boolean;
  product: {
    id: string;
    sellerId: string;
  };
}> {}
