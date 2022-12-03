import { KafkaMessage } from "../../Base";

export class PartnerCreatedEvent extends KafkaMessage<{
  id: string;
  name: string;
  thumbnail: string;
  addedBy: {
    id: string;
  };
}> {}
