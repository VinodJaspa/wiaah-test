import { KafkaMessage } from "../../Base";

export class LookForNearShopsPromotionsEvent extends KafkaMessage<{
  lat: number;
  lon: number;
  userId: string;
}> {}
