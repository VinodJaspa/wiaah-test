import { AccountType } from "./accountTypes";
import { IsString, IsMongoId, IsEmail } from "class-validator";
export class AuthorizationDecodedUser {
  @IsMongoId()
  id: string;

  @IsMongoId({ always: false })
  shopId: string | null;

  @IsString()
  stripeId: string;

  @IsString()
  stripeCustomerId?: string;

  @IsString({ always: false })
  accountType?: AccountType;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  city: string;
  country: string;
  lat: number;
  lon: number;
  membershipId?: string;

  iat: number;
  exp: number;
}
