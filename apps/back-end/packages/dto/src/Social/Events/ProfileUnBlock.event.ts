import { KafkaMessage } from "../../Base";

export class ProfileUnBlockedEvent extends KafkaMessage<{
  unBlockedProfileId: string;
  unBlockerProfileID: string;
}> {}
