import { KafkaMessage } from "../../Base";

export class StripeAccountCreatedEvent extends KafkaMessage<{
  userId: string;
  stripeId: string;
}> {}
