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
import { Container, TabsViewer } from "ui";
import { NumberShortner } from "utils";
import { useTranslation } from "react-i18next";
import { useDisclouser } from "hooks";
import { useSendFollowRequestMutation } from "@features/Social";
import { SlCalender } from "react-icons/sl";

import { useUnFollowProfileMutation } from "@features/Social";
import {
  Account,
  Maybe,
  Profile,
  ProfileVisibility,
  Shop,
  StoreType,
} from "@features/API";
import { useRouting } from "@UI/../routing";
import { TabsTabType, TabType } from "@UI/../types/src";
import { useRouter } from "next/router";
import { TbEdit } from "react-icons/tb";

export interface SocialProfileProps {
  profileInfo: Pick<
    Profile,
    | "activeStatus"
    | "bio"
    | "createdAt"
    | "followers"
    | "following"
    | "id"
    | "lastActive"
    | "ownerId"
    | "photo"
    | "profession"
    | "publications"
    | "updatedAt"
    | "username"
    | "visibility"
    | "verified"
  > & {
    user?: Maybe<
      { __typename?: "Account" } & Pick<
        Account,
        "id" | "verified" | "accountType"
      > & {
        shop: { __typename?: "Shop" } & Pick<
          Shop,
          "type" | "storeType" | "id"
        >;
      }
    >;
  };
  isFollowed: boolean;
  isPublic: ProfileVisibility;
  storeType: StoreType;
  tabsSet?: TabType[];
}

export const SocialProfile: React.FC<SocialProfileProps> = ({
  profileInfo,
  isFollowed,
  isPublic,
  storeType,
  tabsSet,
}) => {
  const router = useRouter();
  const myprofile = router.route === "/myprofile";
  const { t } = useTranslation();
  const [storyProfileId, setStoryProfileId] = React.useState<string>();
  const { visit } = useRouting();

  const { mutate: unFollowProfile } = useUnFollowProfileMutation();
  const { mutate: followProfile } = useUnFollowProfileMutation();
  const { mutate: sendFollowReq } = useSendFollowRequestMutation();

  const isProfilePublic = isPublic;

  const { user } = useUserData();

  const ownProfile = user?.id === profileInfo?.ownerId;

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

  const isProductShop = storeType === StoreType.Product;

  const { isOpen, handleClose, handleOpen } = useDisclouser();

  const {
    isOpen: subscriptionsIsOpen,
    handleOpen: subscriptionsOnOpen,
    handleClose: subscriptionsOnClose,
  } = useDisclouser();

  const isPrivateForUser = !isFollowed && !isPublic;

  if (!profileInfo) return null;

  return (
    <div className={`flex w-fit items-center gap-14 mt-8 mb-6`}>
      {/*<div className="flex text-white justify-between px-4 items-center absolute top-0 left-0 z-10 w-full">
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
*/}

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
      {/*<div className="items-center w-full flex-wrap md:flex-nowrap bg-white border0 border-white bottom-0 left-0 md:h-36 px-2 md:pl-14 py-6 flex flex-col gap-4"> */}

      <div className="flex h-full">
        <Avatar
          onClick={() => setStoryProfileId(profileInfo.id)}
          className="w-[9.5rem] object-cover h-[9.5rem] border-4 border-white shadow-md z-10"
          src={profileInfo.photo}
        ></Avatar>
      </div>

      <div className="flex flex-col gap-4">
        <div className={`flex gap-12 `}>
          <div
            className={`flex items-center ${myprofile ? "justify-between w-full" : "gap-12"
              }`}
          >
            <div className="flex gap-2 items-center">
              <p className="text-xl font-semibold ">{profileInfo.username}</p>
              <>
                {profileInfo.verified ? (
                  <VerifiedIcon className="text-base text-primary" />
                ) : null}
              </>
            </div>

            {myprofile ? (
              <Button
                colorScheme="gray"
                disabled={isPrivateForUser}
                onClick={handleFollowProfile}
                className=" whitespace-nowrap w-fit gap-2 text-black font-semibold text-sm rounded-lg h-8 flex items-center "
              >
                {t("Edit Profile")}
              </Button>
            ) : (
              <HStack className="gap-3 flex ">
                <Button
                  colorScheme="darkbrown"
                  onClick={handleFollowProfile}
                  className="whitespace-nowrap w-full capitalize text-sm font-semibold rounded-lg h-8"
                >
                  {isFollowed
                    ? t("Unfollow")
                    : isProfilePublic
                      ? t("Follow")
                      : t("Ask To Follow")}
                </Button>

                <Button
                  colorScheme="gray"
                  disabled={isPrivateForUser}
                  onClick={handleFollowProfile}
                  className="whitespace-nowrap w-full text-black font-semibold text-sm rounded-lg h-8"
                >
                  {t("Message")}
                </Button>

                <Button
                  colorScheme="darkbrown"
                  onClick={handleFollowProfile}
                  className="h-8 rounded-lg"
                >
                  <SlCalender />
                </Button>
              </HStack>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Stack
            divider={<Divider variant="vert" className="mx-[1.25rem]" />}
            className="w-[fit-content] justify-between gap-1 "
          >
            <div
              className={`${isPrivateForUser ? "text-[#969696]" : ""
                } cursor-pointer border-2 border-white flex gap-1 items-center `}
            >
              <p className="font-semibold text-sm ">
                {NumberShortner(profileInfo.publications)}
              </p>
              <p className=" text-sm lowercase">{t("Posts")}</p>
            </div>

            <div
              className={`${isPrivateForUser ? "text-[#969696]" : ""
                } cursor-pointer flex gap-1 items-center `}
              onClick={() => handleOpen()}
            >
              <p className="font-semibold text-sm ">
                {NumberShortner(profileInfo.followers)}
              </p>
              <p className=" text-sm lowercase">{t("Followers")}</p>
            </div>

            <div
              className={`${isPrivateForUser ? "text-[#969696]" : ""
                } cursor-pointer border-2 border-white flex gap-1 items-center`}
              onClick={() => subscriptionsOnOpen()}
            >
              <p className="font-semibold text-sm">
                {NumberShortner(profileInfo.following)}
              </p>
              <p className=" text-sm lowercase">{t("Following")}</p>
            </div>
          </Stack>
          {/*{ownProfile ? (
            <HStack className="gap-6">
              <Button colorScheme="gray">{t("Modify Profile")}</Button>
              <Button colorScheme="gray">{t("Share Profile")}</Button>
            </HStack>
          ) : (
            <div className="grid grid-rows-2">
              <Button
                className="mb-6 row-span-1 w-full"
                onClick={() => {
                  visit((r) => r.visitShop({ id: profileInfo.ownerId }));
                }}
                disabled={isPrivateForUser}
                colorScheme="darkbrown"
              >
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
            </div>
          )}

*/}
        </div>

        {/* <div className="flex flex-col "> */}
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-sm">Bio</p>
            <p className=" text-sm">{profileInfo.bio}</p>
          </div>
        </div>
      </div>

      <Container className="flex-grow gap-4 flex-col">
        {profileInfo && profileInfo.visibility === ProfileVisibility.Public ? (
          <>
            {/*<TabsViewer tabs={tabsSet!} />*/}
            <Divider />
          </>
        ) : (
          <>
            <div className="flex h-full items-center justify-center flex-grow-[inherit]">
              <p className="font-bold text-3xl">
                {t("this profile is private")}
              </p>
            </div>
          </>
        )}
      </Container>
      {/*</div> */}
    </div>
  );
};
