import { KafkaMessage } from "../../Base";

export class UserDisconnectedEvent extends KafkaMessage<{
  userId: string;
}> {}
