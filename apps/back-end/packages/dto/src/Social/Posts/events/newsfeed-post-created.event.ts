import { KafkaMessage } from "../../../Base";

export class NewPostCreatedEvent extends KafkaMessage<{
  postId: string;
  postType: string;
  refId: string | null;
  authorId: string;
}> {}
