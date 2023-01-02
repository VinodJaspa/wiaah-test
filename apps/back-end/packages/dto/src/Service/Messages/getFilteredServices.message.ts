import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetFilteredServicesMessage extends KafkaMessage<{
  servicesIds?: string[];
  country?: string;
  city?: string;
}> {}

export class GetFilteredServicesMessageReply extends KafkaMessageReply<{
  services: {
    id: string;
    rate: string;
    userId: string;
    type: string;
    location: {
      lat: number;
      lon: number;
      city: string;
      country: string;
    };
  }[];
}> {}
