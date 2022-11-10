import { AccountType } from "../../Auth";
import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetAccountMetaDataByEmailMessage extends KafkaMessage<{
  email: string;
}> {}

export class GetAccountMetaDataByEmailMessageReply extends KafkaMessageReply<{
  username?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  accountType: string;
  emailVerified: boolean;
  id: string;
} | null> {}
