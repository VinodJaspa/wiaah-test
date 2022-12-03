import { KafkaMessage } from "../../../Base";

export class StoryCreatedEvent extends KafkaMessage<{
  id: string;
  userId: string;
}> {}
