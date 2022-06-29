import { KafkaMessage } from "../../Base";

export class SendVerificationEmailEvent extends KafkaMessage<{
  email: string;
  verificationToken: string;
}> {}
