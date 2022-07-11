import { AccountType } from "./userAccount";

export interface CurrentUserDataType {
  name: string;
  email: string;
  photoSrc: string;
  accountType: AccountType;
  id: string;
}
