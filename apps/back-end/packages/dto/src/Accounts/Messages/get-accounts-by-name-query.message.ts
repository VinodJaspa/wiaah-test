import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetAccountsbyNameQueryMessage extends KafkaMessage<{
  nameQuery: string;
  pagination: {
    take: number;
    skip: number;
  };
}> {}

export class GetAccountsByNameQueryMessageReply extends KafkaMessageReply<{
  accounts: {
    id: string;
    name: string;
    email: string;
  }[];
}> {}
