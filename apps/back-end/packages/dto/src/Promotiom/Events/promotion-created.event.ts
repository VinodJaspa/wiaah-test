import { KafkaMessage } from "../../Base";

export class PromotionCreatedEvent extends KafkaMessage<{
  sellerId: string;
  amount: number;
}> {}
