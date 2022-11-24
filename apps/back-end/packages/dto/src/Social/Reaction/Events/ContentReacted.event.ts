import { KafkaMessage } from "../../../Base";

export class ContentReactedEvent extends KafkaMessage<{
  contentType: string;
  contentId: string;
  contentAuthorProfileId: string;
  contentAuthorUserId: string;
  reacterProfileId: string;
  reacterUserId: string;
  contentTitle: string;
}> {}
