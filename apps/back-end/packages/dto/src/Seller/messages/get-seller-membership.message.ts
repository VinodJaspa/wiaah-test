import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetSellerMembershipIdMessage extends KafkaMessage<{
  sellerId: string;
}> {}

export class GetSellerMembershipIdMessageReply extends KafkaMessageReply<{
  membershipId: string;
}> {}
