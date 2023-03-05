import { KafkaMessage } from "../../Base";

export class OrderItemBillingReadyEvent extends KafkaMessage<{
  itemId: string;
  affiliatorId?: string;
  affiliationId?: string;
  affiliationAmount?: number;
  cashback?: number;
  discount?: number;
  discountAmount?: number;
  paidPrice: number;
  buyerId: string;
  sellerId: string;
}> {}
