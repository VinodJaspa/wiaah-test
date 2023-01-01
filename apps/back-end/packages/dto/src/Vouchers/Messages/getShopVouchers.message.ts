import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetShopVouchersMessage extends KafkaMessage<{
  shopId: string;
}> {}

export class GetShopVouchersMessageReply extends KafkaMessageReply<
  {
    code: string;
    amount: number;
    currency: string;
  }[]
> {}
