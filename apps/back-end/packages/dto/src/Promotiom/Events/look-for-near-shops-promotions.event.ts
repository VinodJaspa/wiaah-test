import { UserPreferedLang } from "nest-utils";
import { KafkaMessage } from "../../Base";

export class LookForNearShopsPromotionsEvent extends KafkaMessage<{
  lat: number;
  lon: number;
  userId: string;
  userlang: UserPreferedLang;
}> {}
