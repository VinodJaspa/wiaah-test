import { KafkaMessage } from "../../Base";

export class PartnerRemovedEvent extends KafkaMessage<{
  id: string;
  name: string;
  thumbnail: string;
  removedBy: {
    id: string;
  };
}> {}
