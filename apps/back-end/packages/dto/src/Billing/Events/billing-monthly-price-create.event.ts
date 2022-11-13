import { KafkaMessage } from "../../Base";

export class BillingMonthlyPriceCreateEvent extends KafkaMessage<{
  id: string;
  price: number;
  type: string;
}> {}
