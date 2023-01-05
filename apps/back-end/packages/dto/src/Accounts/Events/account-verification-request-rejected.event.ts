import { KafkaMessage } from "../../Base";

export class AccountVerificationRequestRejectedEvent extends KafkaMessage<{
  id: string;
  email: string;
  phone: string;
  lang: string;
  firstName: string;
  lastName: string;
  rejectReason: string;
}> {}
