import { KafkaMessage } from "../../Base";

export class SellerProductsPurchasedEvent extends KafkaMessage<{
  sellerId: string;
  buyerId: string;
  purchasedAtTimestamp: number;
  productsType: string;
  products: {
    id: string;
    qty: number;
    affiliation?: {
      affiliationAmount?: number;
      affiliatorId?: string;
    };
    discount?: {
      discountAmount?: number;
      discountId?: string;
    };
  }[];
  shippingMethodId: string;
  shippingAddressId: string;
  payment: {
    type: string;
    value: string;
  };
}> {}
