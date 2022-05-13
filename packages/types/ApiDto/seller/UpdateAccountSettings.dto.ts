import { ClientType } from "types";

export interface UpdateAccouuntSettingsDto {
  firstName: string;
  lastName: string;
  username: string;
  photoSrc: string;
  profilePhoto: File;
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
  storeFor: string[];
  brandDescription: string;
}
