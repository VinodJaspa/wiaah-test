import { AccountType } from "../../Auth";
import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetAccountMetaDataByEmailMessage {
  email: string;

  constructor(data: { email: string }) {
    this.email = data.email;
  }
}




export class GetAccountMetaDataByEmailMessageReply extends KafkaMessageReply<{
  username?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  accountType: string;
  emailVerified?: boolean;
  id: string;
} | null> { }
