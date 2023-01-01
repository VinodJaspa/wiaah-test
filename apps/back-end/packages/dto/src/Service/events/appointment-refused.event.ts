import { KafkaMessage } from "../../Base";

export class AppointmentRefusedEvent extends KafkaMessage<{
  id: string;
  sellerId: string;
  buyerId: string;
  reason: string;
  type: string;
  bookedAt: string;
}> {}
