import { KafkaMessage } from "../../Base";

export class ChangePasswordEvent extends KafkaMessage<{
  email: string;
  name: string;
  verificationCode: string;
}> {}
