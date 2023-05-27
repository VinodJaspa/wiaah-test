import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetIsExternalSeller extends KafkaMessage<{
  sellerId: string;
}> {}

export class GetIsExternalSellerReply extends KafkaMessageReply<{
  isExternal: boolean;
}> {}
