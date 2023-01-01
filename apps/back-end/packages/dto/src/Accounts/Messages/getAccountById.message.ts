import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetAccountByIdMessage extends KafkaMessage<{
  accountId: string;
}> {}

export class GetAccountByIdMessageReply extends KafkaMessageReply<{
  email: string;
  accountType: string;
  firstName: string;
  lastName: string;
  verified: boolean;
  address: string;
  address2: string;
  country: string;
  city: string;
  state: string;
  phone: string;
  postalCode: string;
  language: string;
}> {}
