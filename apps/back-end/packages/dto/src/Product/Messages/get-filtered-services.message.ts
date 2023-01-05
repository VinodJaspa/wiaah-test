import { KafkaMessage } from "../../Base";

export class GetFilteredServicesMessage extends KafkaMessage<{
  country?: string;
  city?: string;
  lat?: number;
  lon?: number;
  keywords?: string[];
  ids?: string[];
}> {}

export class GetFilteredServicesMessageReply extends KafkaMessage<{
  services: {
    serviceId: string;
    sellerId: string;
    rate: number;
    sales: number;
    distence: number;
    keywords: string[];
  }[];
}> {}
