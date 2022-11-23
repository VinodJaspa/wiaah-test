import { KafkaMessage } from "../../Base";

export class AffiliatedProductPurchasedEvent extends KafkaMessage<{
  itemId: string;
  itemType: string;
  purchaserId: string;
  affiliatorId: string;
  itemSellerId: string;
}> {}
