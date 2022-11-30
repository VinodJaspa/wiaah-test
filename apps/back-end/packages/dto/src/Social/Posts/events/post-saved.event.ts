import { KafkaMessage } from "../../../Base";

export class PostSavedEvent extends KafkaMessage<{
  postId: string;
  saverId: string;
  postAuthorId: string;
}> {}
