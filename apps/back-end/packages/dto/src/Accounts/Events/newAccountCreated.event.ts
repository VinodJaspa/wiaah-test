import { KafkaMessage } from "../../Base";

export class NewAccountCreatedEvent extends KafkaMessage<{
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  accountType?: string;
}> {}
