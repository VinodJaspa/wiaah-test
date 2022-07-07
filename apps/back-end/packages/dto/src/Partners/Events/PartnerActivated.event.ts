import { KafkaMessage } from "../../Base";

export class PartnerActivatedEvent extends KafkaMessage<{
  id: string;
  name: string;
  thumbnail: string;
  activatedBy: {
    id: string;
  };
}> {}
