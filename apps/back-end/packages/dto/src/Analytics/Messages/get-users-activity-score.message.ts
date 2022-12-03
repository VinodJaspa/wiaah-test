import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetUsersActivityScoresMessage extends KafkaMessage<{
  usersIds: string[];
}> {}

export class GetUsersActivityScoresMessageReply extends KafkaMessageReply<{
  users: {
    id: string;
    score: number;
  }[];
}> {}
