import { KafkaMessage, KafkaMessageReply } from "../../Base";

export enum BuyerToProductActionsType {
  vendor_external_click = "vendor_external_click",
  purchase = "purchase",
}

export class CanPreformProductActionMessage extends KafkaMessage<{
  product: {
    id: string;
  };
  seller: {
    id: string;
    membershipId?: string;
  };
  action: BuyerToProductActionsType;
}> {}

export class CanPreformProductActionMessageReply extends KafkaMessageReply<boolean> {}
