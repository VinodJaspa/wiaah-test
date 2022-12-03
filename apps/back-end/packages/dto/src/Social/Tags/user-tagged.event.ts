import { KafkaMessage } from "../../Base";

export class UserTaggedEvent extends KafkaMessage<{
  userId: string;
  contentId: string;
  contentAuthorId: string;
  contentType: string;
}> {}
