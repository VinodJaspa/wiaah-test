import { useRouting } from "@UI/../routing";
import { useSocialControls } from "@blocks";
import { useGetSocialProfileQuery } from "@features/Social/services";
import { AspectRatio, Button, HStack, Image, VerifiedIcon } from "@partials";
import React from "react";
import { useTranslation } from "react-i18next";
import { getRandomImage } from "placeholder";

const FAKE_GET_SOCIAL_PROFILE_DATA = {
  activeStatus: "Online",
  bio: "Passionate developer and tech enthusiast.",
  createdAt: "2023-01-15T12:00:00Z",
  followers: 1200,
  following: 300,
  id: "profile123",
  lastActive: "2024-06-14T08:30:00Z",
  ownerId: "owner456",
  photo: getRandomImage(),
  profession: "Software Engineer",
  publications: 25,
  updatedAt: "2024-06-14T09:45:00Z",
  username: "john_doe",
  visibility: "Public",
  verified: true,
  user: {
    id: "account789",
    verified: true,
    accountType: "Premium",
    shop: {
      __typename: "Shop",
      type: "Retail",
      storeType: "Online",
      id: "shop101",
    },
  },
  __typename: "Query",
  isFollowed: true,
};

export const SocialPostAuthorHeader: React.FC<{ userId: string }> = ({
  userId,
}) => {
  const { visit } = useRouting();
  const { t } = useTranslation();
  // WARNING: this graphql is not ready yet
  const { data: _data, isLoading } = useGetSocialProfileQuery(userId);
  const data = FAKE_GET_SOCIAL_PROFILE_DATA;
  const { viewUserStory } = useSocialControls();
  const newStory = true;
  return (
    <HStack>
      <button
        className="w-24"
        onClick={() => {
          if (data?.ownerId) {
            viewUserStory(data?.ownerId);
          }
        }}
      >
        <AspectRatio ratio={1 / 2}>
          <Image
            isLoading={isLoading}
            src={data?.photo}
            className={`${newStory ? "border border-primary" : ""
              } w-full h-full rounded-full`}
          />
        </AspectRatio>
      </button>

      <div className="flex flex-col gap-4">
        <div>
          <HStack>
            <p className="text-2xl font-semibold">{data?.username}</p>
            <VerifiedIcon className="text-secondaryBlue" />
          </HStack>
          <p className="text-xs text-iconGray">{data?.profession}</p>
        </div>

        <HStack>
          <Button
            colorScheme="darkbrown"
            onClick={() => {
              if (data?.ownerId) {
                visit((r) => r.visitSocialProfile(data?.ownerId));
              }
            }}
          >
            {t("View Profile")}
          </Button>

          <Button
            colorScheme="darkbrown"
            outline
            onClick={() => {
              if (data?.ownerId) {
                visit((r) => r.visitShopOnMap(data?.ownerId));
              }
            }}
          >
            {t("Show on map")}
          </Button>
        </HStack>
      </div>
    </HStack>
  );
};
