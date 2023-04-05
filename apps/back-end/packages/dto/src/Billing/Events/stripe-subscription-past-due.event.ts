import { KafkaMessage } from "../../Base";

export class StripeSubscriptionPastDueEvent extends KafkaMessage<{
  userId: string;
  subscriptionStripeId: string;
}> {}
