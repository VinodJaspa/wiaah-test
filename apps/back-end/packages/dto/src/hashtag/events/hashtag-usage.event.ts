import { KafkaMessage } from "../../Base";

export class HashtagUsedEvent extends KafkaMessage<{
  id: string;
  userId: string;
  contentId: string;
  contentType: string;
}> {}

export class HashtagUnUsedEvent extends KafkaMessage<{
  id: string;
  userId: string;
  contentId: string;
  contentType: string;
}> {}
