import { KafkaMessage } from "../../Base";

export class UserCurrentLocationUpdateEvent extends KafkaMessage<{
  id: string;
  lat: number;
  lon: number;
}> {}
