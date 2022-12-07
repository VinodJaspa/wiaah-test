import { KafkaMessage } from "../../Base";

export class ShopNearPromotionsResolvedEvent extends KafkaMessage<{
  shops: {
    id: string;
    sellerId: string;
    promotions: {
      top: {
        amount: number;
      };
    };
  }[];
  userId: string;
}> {}
