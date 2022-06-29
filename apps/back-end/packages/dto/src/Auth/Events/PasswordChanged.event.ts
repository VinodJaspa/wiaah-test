import { KafkaMessage } from "../../Base";

export class PasswordChangedEvent extends KafkaMessage<{
  email: string;
  newPassword: string;
  id: string;
}> {}
