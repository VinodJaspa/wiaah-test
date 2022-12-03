import { KafkaMessage } from "../../Base";

export class sendLoginOTPEvent extends KafkaMessage<{
  code: string;
  email: string;
}> {}
