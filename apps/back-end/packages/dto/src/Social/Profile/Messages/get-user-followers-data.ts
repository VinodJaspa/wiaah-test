import { KafkaMessage, KafkaMessageReply } from "../../../Base";

export class GetUserFollowersData extends KafkaMessage<{
  userId: string;
}> {}

export class GetUserFollowersDataReply extends KafkaMessageReply<
  {
    id: string;
  }[]
> {}
