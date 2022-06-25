import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetUserShopIdMessage extends KafkaMessage<string> {}
export class GetUserShopIdMessageReply extends KafkaMessageReply<string> {}
