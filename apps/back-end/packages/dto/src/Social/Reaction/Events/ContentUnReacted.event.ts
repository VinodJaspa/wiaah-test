import { KafkaMessage } from "../../../Base";

export class ContentUnReactedEvent extends KafkaMessage<{
  contentId: string;
  contentType: string;
  userId: string;
}> {}
