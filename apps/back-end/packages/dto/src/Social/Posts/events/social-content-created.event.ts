import { KafkaMessage } from "../../../Base";

export class SocialContentCreatedEvent extends KafkaMessage<{
  id: string;
  type: string;
  authorId: string;
}> {}
