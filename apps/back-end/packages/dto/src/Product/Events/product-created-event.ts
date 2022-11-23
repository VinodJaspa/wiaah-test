import { KafkaMessage } from "../../Base";

export class NewProductCreatedEvent extends KafkaMessage<{
  id: string;
  ownerId: string;
  shopId: string;
}> {}
