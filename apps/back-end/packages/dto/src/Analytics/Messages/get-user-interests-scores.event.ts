import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetUserInterestsScoresMessage extends KafkaMessage<{
  userId: string;
  pagination: {
    page: number;
    take: number;
  };
}> {}

export class GetUserInterestsScoresMessageReply extends KafkaMessageReply<{
  userId: string;
  keywords: {
    value: string;
    score: number;
  }[];
}> {}
