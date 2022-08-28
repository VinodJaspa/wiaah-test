import { AsyncReturnType, ProfileInfo, ShopSocialProfileInfo } from "types";
import { SocialProfileInfo } from "ui/placeholder";
import {
  CheckValidation,
  InferType,
  SocialProfileInfoValidationSchema,
  SocialShopProfileInfoApiResponseValidationSchema,
  SocialShopProfileInfoValidationSchema,
} from "validation";

export type SocialProfileData = InferType<
  typeof SocialProfileInfoValidationSchema
>;

export type SocialShopProfileData = InferType<
  typeof SocialShopProfileInfoValidationSchema
>;
export type GetSocialProfileApiResponseDataType = InferType<
  typeof SocialShopProfileInfoApiResponseValidationSchema
>;

export const getSocialProfileData = async (
  profileId: string
): Promise<GetSocialProfileApiResponseDataType> => {
  const res: AsyncReturnType<typeof getSocialProfileData> = {
    data: {
      accountType: "seller",
      id: "1230",
      name: "test name",
      public: true,
      thumbnail: "/shop-2.jpeg",
      verified: true,
      bio: "123 bio",
      isFollowed: false,
      links: ["test"],
      location: {
        address: "address",
        city: "city",
        cords: {
          lat: 32,
          lng: 23,
        },
        country: "country",
        countryCode: "CH",
        postalCode: 1234,
        state: "Geneve",
      },
      profileCoverPhoto: "/shop-2.jpeg",
      publications: 156,
      subscribers: 135,
      subscriptions: 14,
    },
  };
  return CheckValidation(SocialShopProfileInfoApiResponseValidationSchema, res);
};
