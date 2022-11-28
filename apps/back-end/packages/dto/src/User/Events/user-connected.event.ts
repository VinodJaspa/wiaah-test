import { KafkaMessage } from "../../Base";

export class UserConnectedEvent extends KafkaMessage<{
  userId: string;
}> {}
