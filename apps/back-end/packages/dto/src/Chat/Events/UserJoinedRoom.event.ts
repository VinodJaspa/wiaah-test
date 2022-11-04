import { KafkaMessage } from "../../Base";

export class UserJoinedRoom extends KafkaMessage<{
  roomId: string;
  userId: string;
}> {}

export class UserLeftRoom extends KafkaMessage<{
  roomId: string;
  userId: string;
}> {}
