import { KafkaMessage } from "../../Base";

export class ContentSuspenseRequestEvent extends KafkaMessage<{
  id: string;
  type: string;
  suspensedById: string;
  reason?: string;
}> {}

export class ContentSuspendedEvent extends KafkaMessage<{
  id: string;
  authorId: string;
  type: string;
  byModeration?: boolean;
  reason?: string;
}> {}
