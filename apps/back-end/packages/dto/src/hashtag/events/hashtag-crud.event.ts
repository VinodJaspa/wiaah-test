import { KafkaMessage } from "../../Base";

export class HashtagCreatedEvent extends KafkaMessage<{
  id: string;
  name: string;
}> {}

export class HashtagDeletedEvent extends KafkaMessage<{
  id: string;
}> {}
