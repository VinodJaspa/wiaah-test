import { KafkaMessage } from "../../Base";

export class SellerAccountRefusedEvent extends KafkaMessage<{
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  reason: string;
}> {}
