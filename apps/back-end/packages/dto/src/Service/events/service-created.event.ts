import { KafkaMessage } from "../../Base";

export class ServiceCreatedEvent extends KafkaMessage<{
  id: string;
  userId: string;
  type: string;
}> {}
