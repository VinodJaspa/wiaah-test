import { KafkaMessage } from "../../Base";

export class SubscriptionPaidEvent extends KafkaMessage<{
  id: string;
  userId: string;
  endAt: string;
  startAt: string;
  membershipId: string;
}> {}
