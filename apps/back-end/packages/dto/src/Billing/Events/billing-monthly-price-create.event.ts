import { KafkaMessage } from "../../Base";

export class BillingMonthlyPriceCreatedEvent extends KafkaMessage<{
  id: string;
  price: number;
  type: string;
}> {}
