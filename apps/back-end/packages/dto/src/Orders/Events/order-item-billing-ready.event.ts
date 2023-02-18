import { KafkaMessage } from "../../Base";

export class OrderItemBillingReadyEvent extends KafkaMessage<{
  itemId: string;
  affiliatorId?: string;
  affiliationId?: string;
  affiliationAmount?: number;
  cashbackId?: string;
  cashbackAmount?: number;
  discountId?: string;
  discountAmount?: number;
  paidPrice: number;
  buyerId: string;
  sellerId: string;
}> {}
