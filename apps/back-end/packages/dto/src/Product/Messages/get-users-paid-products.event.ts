import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetUserPaidProductsMessage extends KafkaMessage<{
  userId: string;
}> {}

export class GetUserPaidProductsMessageReply extends KafkaMessageReply<{
  id: string;
  products: {
    userId: string;
    productId: string;
  }[];
}> {}

export class GetBulkUsersPaidProductsMessage extends KafkaMessage<{
  userIds: string[];
  pagination: {
    take: number;
    page: number;
  };
}> {}

export class GetBulkUsersPaidProductsMessageReply extends KafkaMessageReply<{
  users: {
    id: string;
    products: {
      userId: string;
      productId: string;
    }[];
  }[];
}> {}
