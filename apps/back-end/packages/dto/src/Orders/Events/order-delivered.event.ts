import { KafkaMessage } from "../../Base";

export class OrderDeliveredEvent extends KafkaMessage<{
  orderId: string;
  buyerId: string;
}> {}
