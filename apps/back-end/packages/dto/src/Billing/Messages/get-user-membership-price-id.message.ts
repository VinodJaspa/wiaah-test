import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetUserMembershipPriceIdMessage extends KafkaMessage<{
  membershipId: string;
  userId: string;
}> {}

export class GetUserMembershipPriceIdMessageReply extends KafkaMessageReply<{
  priceId: string;
}> {}
