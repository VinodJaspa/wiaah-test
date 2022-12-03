import { KafkaMessage } from "../../Base";

export class SellerRevenueIncreasedEvent extends KafkaMessage<{
  sellerId: string;
  amount: number;
  allTimeRevenue: number;
}> {}
