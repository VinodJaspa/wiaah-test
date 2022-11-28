import { KafkaMessage } from "../../Base";

export class ServicePurchasedEvent extends KafkaMessage<{
  serviceId: string;
  sellerId: string;
  purchaserId: string;
  type: string;
}> {}
