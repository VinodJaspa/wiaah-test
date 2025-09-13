import { AccountType } from "./userAccount";

export interface CurrentUserDataType {
  name: string;
  email: string;
  photoSrc: string;
  accountType: AccountType;
  id: string;
  firstName: string;
  photo?: string;
  lastName: string;
  phoneNumber?: string;
  isEmailVerified?: boolean;
  isPhoneNumberVerified?: boolean;
  createdAt: string;
  updatedAt: string;
  address?: {
    city: string;
    state: string;
    country: string;
    postalCode: string;
    streetAddress: string;
  };
}
