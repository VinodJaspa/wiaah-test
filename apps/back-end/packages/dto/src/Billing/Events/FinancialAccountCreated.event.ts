import { KafkaMessage } from "../../Base";

export class FinancialAccountCreatedEvent extends KafkaMessage<{
  last4: string;
  id: string;
  userId: string;
  type: string;
  cardType: string;
}> {}
