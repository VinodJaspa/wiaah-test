import { array, boolean, mixed, number, object, string } from "yup";
import {
  Location,
  createApiResponseValidationSchema,
} from "../../../../SharedSchema";
export type SocialAccountType = "seller" | "buyer";

export const SocialAccountTypeEnum: SocialAccountType[] = ["seller", "buyer"];

export const SocialProfileInfoValidationSchema = object({
  id: string().required(),
  verified: boolean().required(),
  name: string().required(),
  thumbnail: string().required(),
  accountType: mixed<SocialAccountType>()
    .oneOf(SocialAccountTypeEnum)
    .required(),
  public: boolean().required(),
});

export const SocialShopProfileInfoValidationSchema =
  SocialProfileInfoValidationSchema.concat(
    object({
      publications: number().required(),
      subscriptions: number().required(),
      subscribers: number().required(),
      location: Location().required(),
      bio: string().required(),
      links: array().of(string().required()).min(0).required(),
      isFollowed: boolean().required(),
      profileCoverPhoto: string().required(),
    })
  );

export const SocialShopProfileInfoApiResponseValidationSchema =
  createApiResponseValidationSchema(SocialProfileInfoValidationSchema);
