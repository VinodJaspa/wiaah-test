import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetUsersInteractionsByUserIdMessage extends KafkaMessage<{
  userId: string;
}> {}

export class GetUsersInteractionsByUserIdMessageReply extends KafkaMessageReply<{
  users: {
    id: string;
    score: number;
  }[];
}> {}
