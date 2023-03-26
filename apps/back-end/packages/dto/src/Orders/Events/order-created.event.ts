import { KafkaMessage } from "../../Base";

export class OrderCreatedEvent extends KafkaMessage<{
  buyer: {
    id: string;
    name: string;
    email: string;
    currency: string;
  };
  seller: {
    id: string;
    name: string;
    email: string;
    currency: string;
  };
  order: {
    id: string;
    payment: {
      ending_with: string;
      type: string;
    };
    address: string;
    date: string;
    items: {
      name: string;
      thumbnail: string;
      qty: number;
      price: number;
      categories: string[];
    }[];
    bills: {
      subtotal: number;
      shipping: {
        type: string;
        price: number;
      };
      tax: number;
      discount?: {
        name: string;
        percent: number;
      };
      total: number;
      paid: number;
      paidCurrency: string;
    };
  };
}> {}
