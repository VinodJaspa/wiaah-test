import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetFilteredProductsMessage extends KafkaMessage<{
  keywords?: string[];
  city?: string;
  country?: string;
  lat?: number;
  lon?: number;
  pagination: {
    page: number;
    take: number;
  };
}> {}

export class GetFilteredProductsMessageReply extends KafkaMessageReply<{
  products: {
    productId: string;
    rate: number;
    sales: number;
    distence: number;
    keywords: string[];
  }[];
}> {}
