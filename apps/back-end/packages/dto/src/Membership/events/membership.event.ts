import { KafkaMessage } from "../../Base";

export class MembershipCreatedEvent extends KafkaMessage<{
  id: string;
  name: string;
  active: boolean;
  pricing: { priceInCents: number; limit: number }[];
  price: number;
}> {}

export class MembershipUpdatedEvent extends KafkaMessage<{
  id: string;
  name?: string;
  active?: boolean;
  pricing?: { priceInCents: number; limit: number }[];
}> {}
