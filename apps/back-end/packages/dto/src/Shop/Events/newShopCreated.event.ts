import { KafkaMessage } from "../../Base";

export class NewShopCreatedEvent extends KafkaMessage<{
  shopId: string;
  country: string;
  city: string;
  state: string;
  userId: string;
  shopName: string;
}> {}
