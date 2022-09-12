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
      name: "Jane Daniel",
      public: true,
      thumbnail: "/shop-2.jpeg",
      verified: true,
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend diam cras eu felis egestas aliquam. Amet ornare",
      isFollowed: false,
      links: ["this is a test link"],
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
      profession: "Agent",
    },
  };
  return CheckValidation(SocialShopProfileInfoApiResponseValidationSchema, res);
};
