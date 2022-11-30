import { KafkaMessage } from "../../Base";

export class ContentSharedEvent extends KafkaMessage<{
  contentType: string;
  contentId: string;
  contentAuthorProfileId: string;
  contentAuthorUserId: string;
  sharedByProfileId: string;
  sharedByUserId: string;
  sharedAt: string;
}> {}
