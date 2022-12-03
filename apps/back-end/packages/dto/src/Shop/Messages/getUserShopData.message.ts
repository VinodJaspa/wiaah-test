import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetUserShopMetaDataMessage extends KafkaMessage<{
  accountId: string;
}> {}
export class GetUserShopMetaDataMessageReply extends KafkaMessageReply<{
  shopId: string;
}> {}
