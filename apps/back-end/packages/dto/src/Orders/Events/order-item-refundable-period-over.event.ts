import { KafkaMessage } from "../../Base";

export class OrderItemRefundablePeriodOverEvent extends KafkaMessage<{
  productId: string;
}> {}
