import { KafkaMessage } from "../../Base";

export class PartnerDeActivatedEvent extends KafkaMessage<{
  id: string;
  name: string;
  thumbnail: string;
  deactivatedBy: {
    id: string;
  };
}> {}
