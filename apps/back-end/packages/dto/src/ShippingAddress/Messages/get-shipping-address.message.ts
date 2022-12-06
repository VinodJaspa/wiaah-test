import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetShippingAddressMessage extends KafkaMessage<{
  id: string;
}> {}

export class GetShippingAddressMessageReply extends KafkaMessageReply<{
  address: string;
  address2: string;
  state: string;
  city: string;
  country: string;
  coords: {
    lat: number;
    lon: number;
  };
  ownerId: string;
}> {}
