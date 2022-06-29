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
