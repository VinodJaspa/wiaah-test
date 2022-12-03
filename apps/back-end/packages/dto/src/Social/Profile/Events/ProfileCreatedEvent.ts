import { KafkaMessage } from "../../../Base";

export class ProfileCreatedEvent extends KafkaMessage<{
  profileId: string;
  userId: string;
}> {}
