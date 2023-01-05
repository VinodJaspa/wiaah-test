import { GqlPaginationInput } from "nest-utils";
import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetFilteredServicesMessage extends KafkaMessage<{
  servicesIds?: string[];
  country?: string;
  city?: string;
  lat?: number;
  lon?: number;
  keywords?: string[];
  pagination: GqlPaginationInput;
}> {}

export class GetFilteredServicesMessageReply extends KafkaMessageReply<{
  services: {
    id: string;
    rate: number;
    sales: number;
    userId: string;
    type: string;
    location?: {
      lat: number;
      lon: number;
      city: string;
      country: string;
    };
    distence: number;
    keywords: string[];
  }[];
}> {}
