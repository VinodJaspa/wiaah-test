import { ClientType } from "types";

export type StoreFor = "men" | "women" | "children" | "babies";
export type ShopType = string;
export interface UpdateAccouuntSettingsDto {
  firstName: string;
  lastName: string;
  username: string;
  photoSrc: string;
  profilePhoto?: File;
  bio: string;
  email: string;
  country: string;
  countryCode: string;
  city: string;
  address: string;
  address2: string;
  phoneNumber: string;
  language: string;
  clientType: ClientType;
  storeFor: StoreFor[];
  brandDescription: string;
  shopType: ShopType;
}
