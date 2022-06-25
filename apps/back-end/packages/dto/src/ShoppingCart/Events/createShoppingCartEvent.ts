import { KafkaMessage } from "../../Base";

export class CreateShoppingCartEvent extends KafkaMessage<{
  ownerId: string;
}> {}
