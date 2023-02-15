import { KafkaMessage } from "../../Base";

export class OrderItemRefundablePeriodOverEvent extends KafkaMessage<{
  itemId: string;
}> {}
