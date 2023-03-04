import { AccountType } from "nest-utils";
import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetAdminAccountByEmailMesssage extends KafkaMessage<{
  email: string;
}> {}

export class GetAdminAccountByEmailMessageReply extends KafkaMessageReply<{
  id: string;
  email: string;
  password: string;
  accountType: AccountType;
}> {}
