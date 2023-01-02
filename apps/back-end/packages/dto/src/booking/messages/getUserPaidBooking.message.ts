import { KafkaMessage, KafkaMessageReply } from "../../Base";

export class GetUserPaidBookingMessage extends KafkaMessage<{
  userId: string;
}> {}

export class GetUserPaidBookingMessageReply extends KafkaMessageReply<{
  bookings: {
    userId: string;
    serviceId: string;
  }[];
}> {}

export class GetBulkUsersPaidBookingMessage extends KafkaMessage<{
  userIds: string[];
}> {}

export class GetBulkUsersPaidBookingMessageReply extends KafkaMessageReply<{
  users: {
    id: string;
    bookings: {
      userId: string;
      serviceId: string;
    }[];
  }[];
}> {}
