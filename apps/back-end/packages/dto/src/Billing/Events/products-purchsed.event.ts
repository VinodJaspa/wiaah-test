import { KafkaMessage } from "../../Base";

export class SellerProductsPurchasedEvent extends KafkaMessage<{
  sellerId: string;
  buyerId: string;
  purchasedAtTimestamp: number;
  productsType: string;
  products: {
    id: string;
    qty: number;
    affiliatorId?: string;
  }[];
  shippingMethodId: string;
}> {}
