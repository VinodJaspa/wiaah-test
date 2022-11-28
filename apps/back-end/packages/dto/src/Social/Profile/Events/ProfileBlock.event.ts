import { KafkaMessage } from "../../../Base";

export class ProfileBlockEvent extends KafkaMessage<{
  blockedProfileId: string;
  blockerProfileId: string;
}> {}
