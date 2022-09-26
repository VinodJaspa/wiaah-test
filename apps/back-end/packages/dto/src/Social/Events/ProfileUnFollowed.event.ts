import { KafkaMessage } from "../../Base";

export class ProfileUnFollowEvent extends KafkaMessage<{
  followedId: string;
  followerId: string;
  followerProfileId: string;
  followedProfileId: string;
}> {}
