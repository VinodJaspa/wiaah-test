import { KafkaMessage } from "../../Base";

export class BillingPriceCreatedEvent extends KafkaMessage<{
  type: string;
  id: string;
  priceId: string;
}> {}
