import { KafkaMessage } from "../../../Base";

export class ProfileVisitedEvent extends KafkaMessage<{
  profileId: string;
  visitorId: string;
  profileAuthorId: string;
}> {}
