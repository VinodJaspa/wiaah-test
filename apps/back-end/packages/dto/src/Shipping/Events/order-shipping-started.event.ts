import { KafkaMessage } from "../../Base";

export class OrderShippingEvent extends KafkaMessage<{
  buyer: {
    id: string;
    email: string;
    name: string;
  };
  seller: {
    id: string;
    email: string;
    name: string;
  };
  order: {
    id: string;
    orderedAt: string;
  };
}> {}
