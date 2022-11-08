import { KafkaMessage } from "../../Base";

export type AccountType = "seller" | "buyer";

// export enum AccountType {
//   "seller","buyer"
// }

export class AccountRegisteredEvent extends KafkaMessage<{
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accountType: AccountType;
  verificationCode: string;
}> {}

export class SellerAccountRegisteredEvent extends KafkaMessage<{
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  companyRegisterationNumber: string;
}> {}

export class BuyerAccountRegisteredEvent extends KafkaMessage<{
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}> {}
