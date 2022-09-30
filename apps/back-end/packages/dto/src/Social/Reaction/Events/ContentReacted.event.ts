import { KafkaMessage } from "../../../Base";

export type ContentReactedType = "newsfeed-post" | "comment";

export class ContentReactedEvent extends KafkaMessage<{
  contentType: ContentReactedType;
  contentId: string;
  contentAuthorProfileId: string;
  contentAuthorUserId: string;
  reacterProfileId: string;
  reacterUserId: string;
  contentTitle: string;
}> {}
