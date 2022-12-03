import { KafkaMessage } from "../../Base";

export class NewRegisterationTokenRequestedEvent extends KafkaMessage<{
  email: string;
  token: string;
}> {}
