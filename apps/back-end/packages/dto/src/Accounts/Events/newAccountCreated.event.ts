import { KafkaMessage } from "../../Base";

export class NewAccountCreatedEvent extends KafkaMessage<{
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  username: string;
  accountType?: string;
  profession?: string;
  birthDate: string;
}> {}

export class SellerAccountCreatedEvent extends KafkaMessage<{
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}> {}

export class BuyerAccountCreatedEvent extends KafkaMessage<{
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}> {}
