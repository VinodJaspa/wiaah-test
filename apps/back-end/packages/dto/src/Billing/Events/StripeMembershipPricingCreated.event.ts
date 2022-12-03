import { KafkaMessage } from "../../Base";

export class StripeMembershipPricingCreatedEvent extends KafkaMessage<{
  priceId: string;
  membershipId: string;
}> {}
