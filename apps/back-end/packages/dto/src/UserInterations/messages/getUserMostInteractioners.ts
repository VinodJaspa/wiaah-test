import { GqlPaginationInput } from "nest-utils";
import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetUserMostInteractionersMessage extends KafkaMessage<{
  userId: string;
  pagination: GqlPaginationInput;
  usersWithin?: string[];
}> {}

export class GetUserMostInteractionersMessageReply extends KafkaMessageReply<{
  users: {
    id: string;
    score: number;
  }[];
}> {}

export class GetBulkUserMostInteractionersMessage extends KafkaMessage<{
  userIds: string[];
  pagination: GqlPaginationInput;
}> {}

export class GetBulkUserMostInteractionersMessageReply extends KafkaMessageReply<{
  users: {
    id: string;
    users: {
      id: string;
      score: number;
    }[];
  }[];
}> {}
