import { KafkaMessage } from "../../Base";

export class ContentSuspenseRequestEvent extends KafkaMessage<{
  id: string;
  type: string;
  suspensedById: string;
}> {}
