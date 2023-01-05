import { GqlPaginationInput } from "nest-utils";
import { KafkaMessage, KafkaMessageReply } from "../../../Base";

export class GetUserFollowersData extends KafkaMessage<{
  userId: string;
  pagination: GqlPaginationInput;
}> {}

export class GetUserFollowersDataReply extends KafkaMessageReply<{
  total: number;

  ids: string[];
}> {}
