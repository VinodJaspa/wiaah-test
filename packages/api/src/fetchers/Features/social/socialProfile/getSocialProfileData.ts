import { AsyncReturnType, ProfileInfo, ShopSocialProfileInfo } from "types";
import { SocialProfileInfo } from "ui/placeholder";
import {
  CheckValidation,
  InferType,
  SocialProfileInfoValidationSchema,
  SocialShopProfileInfoApiResponseValidationSchema,
} from "validation";

export type SocialProfileData = InferType<
  typeof SocialProfileInfoValidationSchema
>;

export type GetSocialProfileApiResponseDataType = InferType<
  typeof SocialShopProfileInfoApiResponseValidationSchema
>;

export const getSocialProfileData = async (
  profileId: string
): Promise<GetSocialProfileApiResponseDataType> => {
  const res: AsyncReturnType<typeof getSocialProfileData> = {
    data: {
      accountType: "buyer",
      id: "1230",
      name: "test name",
      public: true,
      thumbnail: "/shop-2.jpeg",
      verified: true,
    },
  };
  return CheckValidation(SocialShopProfileInfoApiResponseValidationSchema, res);
};
