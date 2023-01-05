import { KafkaMessage } from "../../Base";

export class AccountVerificationRequestAcceptedEvent extends KafkaMessage<{
  id: string;
  email: string;
  phone: string;
  lang: string;
  firstName: string;
  lastName: string;
}> {}
