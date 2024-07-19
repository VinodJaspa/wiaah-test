import { KafkaMessage } from "../../../Base";

export class ContentReactedEvent extends KafkaMessage<{
  contentType: string;
  contentId: string;
  contentAuthorUserId: string;
  reacterUserId: string;
  contentTitle: string;
  keywords?: string[];
  reacterProfileId?: string;
}> { }
