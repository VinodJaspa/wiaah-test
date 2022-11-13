import { KafkaMessage } from "../../Base";

export class SubscriptionPaidEvent extends KafkaMessage<{
  id: string;
  userId: string;
  type: string;
}> {}
