import { KafkaMessage } from "../../Base";

export class SellerServicePurchasedEvent extends KafkaMessage<{
  serviceBookId: string;
}> {}
