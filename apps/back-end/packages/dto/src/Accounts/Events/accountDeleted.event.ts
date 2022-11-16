import { KafkaMessage } from "../../Base";

export class AccountDeletedEvent extends KafkaMessage<{
  accountId: string;
}> {}
