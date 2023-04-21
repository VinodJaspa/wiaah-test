import React from "react";
import {
  SubscribersPopup,
  Avatar,
  SocialStoryModal,
  Button,
  HStack,
  Stack,
  Divider,
  LinkIcon,
  QrcodeDisplay,
  SocialProfileOptionsDropdown,
  HorizontalDotsIcon,
  VerifiedIcon,
  ArrowLeftIcon,
  VStack,
  useUserData,
  ArrowDownIcon,
  CalenderIcon,
  useGetUserShopType,
  ShoppingBagIcon,
  ShoppingCartIcon,
} from "@UI";
import { mapArray, NumberShortner } from "utils";
import { useTranslation } from "react-i18next";
import { useDisclouser } from "hooks";
import { useSendFollowRequestMutation } from "@features/Social";

import { useUnFollowProfileMutation } from "@features/Social";
import { ProfileVisibility, StoreType } from "@features/API";

export interface SocialProfileProps {
  profileInfo: {
    id: string;
    photo: string;
    username: string;
    profession: string;
    verified: string;
    publications: number;
    followers: number;
    following: number;
    bio: string;
    ownerId: string;
  };
  isFollowed: boolean;
  isPublic: boolean;
}

export const SocialProfile: React.FC<SocialProfileProps> = ({
  profileInfo,
  isFollowed,
  isPublic,
}) => {
  const { t } = useTranslation();
  const [storyProfileId, setStoryProfileId] = React.useState<string>();

  const { mutate: unFollowProfile } = useUnFollowProfileMutation();
  const { mutate: followProfile } = useUnFollowProfileMutation();
  const { mutate: sendFollowReq } = useSendFollowRequestMutation();

  const { data: shop } = useGetUserShopType({ userId: profileInfo.ownerId });

  const { user } = useUserData();
  const isProfilePublic = isPublic;

  const ownProfile = true;

  function handleFollowProfile() {
    if (isFollowed) {
      unFollowProfile({ profileId: profileInfo.id });
      return;
    }
    if (isProfilePublic) {
      followProfile({
        profileId: profileInfo.id,
      });
      return;
    }

    sendFollowReq(profileInfo.id);
  }

  const isProductShop = shop?.storeType === StoreType.Product;

  const { isOpen, handleClose, handleOpen } = useDisclouser();

  const {
    isOpen: subscriptionsIsOpen,
    handleOpen: subscriptionsOnOpen,
    handleClose: subscriptionsOnClose,
  } = useDisclouser();

  if (!profileInfo) return null;

  return (
    <div className="flex flex-col w-full md:h-80 relative">
      <div className="flex text-white justify-between px-4 items-center absolute top-0 left-0 z-10 w-full">
        <ArrowLeftIcon className="text-xl w-10" />
        <HStack className="text-lg">
          {ownProfile ? (
            <>
              <p className=" whitespace-nowrap font-semibold">
                {profileInfo.username}
              </p>
              {profileInfo.verified ? (
                <ArrowDownIcon className="text-xl" />
              ) : null}
            </>
          ) : (
            <>
              <p className=" whitespace-nowrap font-semibold">
                {profileInfo.username}
              </p>
              {profileInfo.verified ? (
                <VerifiedIcon className="text-xs" />
              ) : null}
            </>
          )}
        </HStack>
        <SocialProfileOptionsDropdown profileId={profileInfo.id}>
          <HorizontalDotsIcon className="cursor-pointer w-10" />
        </SocialProfileOptionsDropdown>
      </div>

      {storyProfileId && <SocialStoryModal profileId={storyProfileId} />}
      <SubscribersPopup
        title={t("subscribers")}
        isOpen={isOpen}
        onClose={handleClose}
      />
      <SubscribersPopup
        title={t("subscriptions")}
        isOpen={subscriptionsIsOpen}
        onClose={subscriptionsOnClose}
      />
      <div className="items-center w-full pt-16 flex-wrap md:flex-nowrap bg-white border-2 border-white bottom-0 left-0 md:h-36 px-2 md:pl-14 py-6 flex flex-col gap-4">
        <div className="relative">
          <div className="w-[500px] -bottom-[40%] left-1/2 -translate-x-1/2 h-[500px] skew-x-[55deg] rotate-[-27deg] bg-primary absolute rounded-full"></div>
          <Avatar
            onClick={() => setStoryProfileId(profileInfo.id)}
            className="w-[8.625rem] border-4  border-white shadow-md z-10"
            src={profileInfo.photo}
            name={profileInfo.username}
          ></Avatar>
        </div>

        <HStack>
          <p className="text-2xl font-bold">{profileInfo.username}</p>

          <>
            {profileInfo.verified ? (
              <VerifiedIcon className="text-lg text-primary" />
            ) : null}
          </>
        </HStack>

        <div className="flex flex-col gap-4">
          <Stack
            divider={<Divider variant="vert" className="mx-[1.25rem]" />}
            className="w-[fit-content]"
          >
            <VStack className="cursor-pointer border-2 border-white">
              <p className="font-medium text-sm">{t("Posts")}</p>
              <p className="font-bold text-xl">
                {NumberShortner(profileInfo.publications)}
              </p>
            </VStack>

            <VStack className="cursor-pointer" onClick={() => handleOpen()}>
              <p className="font-medium text-sm">{t("Followers")}</p>
              <p className="font-bold text-xl">
                {NumberShortner(profileInfo.followers)}
              </p>
            </VStack>

            <VStack
              className="cursor-pointer"
              onClick={() => subscriptionsOnOpen()}
            >
              <p className="font-medium text-sm">{t("Following")}</p>
              <p className="font-bold text-xl">
                {NumberShortner(profileInfo.following)}
              </p>
            </VStack>
          </Stack>
          {ownProfile ? (
            <HStack className="gap-6">
              <Button colorScheme="gray">{t("Modify Profile")}</Button>
              <Button colorScheme="gray">{t("Share Profile")}</Button>
            </HStack>
          ) : (
            <>
              <HStack className="gap-4">
                <Button
                  colorScheme="darkbrown"
                  onClick={handleFollowProfile}
                  className="whitespace-nowrap w-full"
                >
                  {isFollowed
                    ? t("Unfollow")
                    : isProfilePublic
                    ? t("Follow")
                    : t("Ask To Follow")}
                </Button>

                <Button
                  colorScheme="darkbrown"
                  onClick={handleFollowProfile}
                  className="whitespace-nowrap w-full"
                >
                  {t("Message")}
                </Button>
              </HStack>

              <Button colorScheme="darkbrown">
                <HStack className="justify-center">
                  {isProductShop ? (
                    <>
                      <ShoppingCartIcon />
                      <p>{t("Shopping")}</p>
                    </>
                  ) : (
                    <>
                      <CalenderIcon />
                      <p>{t("Booking")}</p>
                    </>
                  )}
                </HStack>
              </Button>
            </>
          )}
        </div>

        {/* <div className="flex flex-col "> */}
        <p className="">"{profileInfo.bio}"</p>
      </div>
    </div>
  );
};
