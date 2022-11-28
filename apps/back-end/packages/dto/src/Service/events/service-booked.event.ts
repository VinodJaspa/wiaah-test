import { KafkaMessage } from "../../Base";

export class ServiceBookedEvent extends KafkaMessage<{
  id: string;
  type: string;
  purchaserId: string;
  sellerId: string;
}> {}
