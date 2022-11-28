import { KafkaMessage } from "../../../Base";

export class ProfileFollowedEvent extends KafkaMessage<{
  followedId: string;
  followerId: string;
  followerProfileId: string;
  followedProfileId: string;
}> {}
