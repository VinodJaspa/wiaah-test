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
  MoreOptionsPopup,
} from "@UI";
import { Container, TabsViewer } from "ui";
import { NumberShortner } from "utils";
import { useTranslation } from "react-i18next";
import { useDisclouser } from "hooks";
import { useSendFollowRequestMutation } from "../../../features/Social";
import { SlCalender } from "react-icons/sl";

import { useUnFollowProfileMutation } from "../../../features/Social";
import {
  Account,
  Maybe,
  Profile,
  ProfileVisibility,
  Shop,
  StoreType,
} from "../../../features/API";
import { useRouting } from "routing";
import { TabsTabType, TabType } from "types";
import { useRouter } from "next/router";
import { TbEdit } from "react-icons/tb";
import ChatInputBox from "@UI/components/shadcn-components/Fields/chatbox";

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
  const [showChat, setShowChat] = React.useState(false);
  const [localIsFollowed, setLocalIsFollowed] = React.useState(isFollowed); // local state
  const isProfilePublic = isPublic;

  const { user } = useUserData();
  const ownProfile = user?.id === profileInfo?.ownerId;

  const handleMessageClick = () => {
    setShowChat(true);
  };

  const handleCloseChat = () => {
    setShowChat(false);
  };

  function handleFollowProfile() {
    if (localIsFollowed) {
      // Optimistically update UI
      setLocalIsFollowed(false);
      unFollowProfile(
        { profileId: profileInfo.id },
        {
          // onError: () => setLocalIsFollowed(true), // rollback if error
        }
      );
      return;
    }

    if (isProfilePublic) {
      setLocalIsFollowed(true);
      followProfile(
        { profileId: profileInfo.id },
        {
          // onError: () => setLocalIsFollowed(false), // rollback if error
        }
      );
      return;
    }

    // Private profile: send follow request
    sendFollowReq(profileInfo.id);
    alert("Follow request sent");
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
    <div
      className={`flex flex-col md:w-fit w-9/12 md:flex-row items-center md:gap-14 gap-3 md:my-6 mt-0 `}
    >
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
        <div className="gap-2 md:order-none order-1 justify-center items-center flex md:hidden">
          <p className="text-[22px] font-bold ">{profileInfo.username}</p>
          <>
            {profileInfo.verified ? (
              <VerifiedIcon className="text-base text-black" />
            ) : null}
          </>
        </div>
        <div
          className={` md:order-none order-3 md:flex flex-col md:gap-12 gap-2  items-center md:justify-between justify-center `}
        >
          <div
            className={`flex  items-center w-full ${myprofile
              ? "md:justify-between  justify-center"
              : "md:gap-12 gap-0"
              }`}
          >
            {/* USERNAME */}
            <div className="gap-2 items-center hidden md:flex">
              <p className="text-xl font-semibold ">{profileInfo.username}</p>
              <>
                {profileInfo.verified ? (
                  <VerifiedIcon className="text-base text-primary" />
                ) : null}
              </>
            </div>
            {/* BUTTONS */}
            {myprofile ? (
              // Edit Button
              (<div className=" gap-3 md:flex md:justify-end  w-full grid grid-cols-2 ">
                <Button
                  colorScheme="gray"
                  disabled={isPrivateForUser}
                  onClick={() => router.replace("/editprofile")}
                  className=" whitespace-nowrap col-span-1 w-full md:w-fit gap-2 text-black font-semibold text-sm rounded-lg h-8 flex items-center justify-center"
                >
                  {t("Edit Profile")}
                </Button>
                <Button
                  colorScheme="gray"
                  disabled={isPrivateForUser}
                  className=" md:hidden flex col-span-1 whitespace-nowrap w-full gap-2 text-black font-semibold text-sm rounded-lg h-8 items-center justify-center "
                >
                  {t("Share Profile")}
                </Button>
              </div>)
            ) : (
              // Follow Buttons
              (
                <div className="gap-3 md:flex w-full flex-row">
                <Button
                  colorScheme="darkbrown"
                  onClick={handleFollowProfile}
                  className="whitespace-nowrap flex-1 min-w-[100px] capitalize text-sm font-semibold rounded-lg h-8"
                >
                  {localIsFollowed
                    ? t("Unfollow")
                    : isProfilePublic
                      ? t("Follow")
                      : t("Ask To Follow")}
                </Button>
              
                <Button
                  colorScheme="gray"
                  onClick={handleMessageClick}
                  className="whitespace-nowrap flex-1 min-w-[100px] text-sm font-semibold rounded-lg h-8"
                >
                  Message
                </Button>
              
                <MoreOptionsPopup className="md:flex hidden text-3xl " />
              </div>
              
              )
            )}
          </div>
        </div>
        {/* Profile Info*/}
        <div className="flex gap-4 md:order-none order-2">
          <Stack
            divider={
              <Divider variant="vert" className="md:mx-[1.25rem] mx-[0.3rem]" />
            }
            className="w-[fit-content] md:w-full justify-between gap-1 "
          >
            <div
              className={`${isPrivateForUser ? "text-[#969696]" : ""
                } cursor-pointer border-2 border-white flex flex-col md:flex-row gap-1 items-center `}
            >
              <p className="font-semibold md:text-sm text-xl order-last md:order-none ">
                {NumberShortner(profileInfo.publications)}
              </p>
              <p className=" text-sm ">{t("Posts")}</p>
            </div>

            <div
              className={`${isPrivateForUser ? "text-[#969696]" : ""
                } cursor-pointer border-2 border-white flex flex-col md:flex-row gap-1 items-center `}
              onClick={() => subscriptionsOnOpen()}
            >
              <p className="font-semibold  md:text-sm text-xl order-last md:order-none ">
                {NumberShortner(profileInfo.following)}
              </p>
              <p className=" text-sm ">{t("Following")}</p>
            </div>

            <div
              className={`${isPrivateForUser ? "text-[#969696]" : ""
                } cursor-pointer flex flex-col md:flex-row gap-1 items-center `}
              onClick={() => handleOpen()}
            >
              <p className="font-semibold md:text-sm text-xl order-last md:order-none ">
                {NumberShortner(profileInfo.followers)}
              </p>
              <p className=" text-sm ">{t("Followers")}</p>
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
        <div className="flex md:justify-normal justify-start md:order-none order-4 ">
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-sm hidden md:flex">Bio</p>
            <p className=" text-sm">{profileInfo.bio}</p>
          </div>
        </div>
      </div>
      <Container className="flex-grow gap-4 flex-col">
        {profileInfo && profileInfo.visibility === ProfileVisibility.Public ? (
          <>
            {/*<TabsViewer tabs={tabsSet!} />
            <Divider />
*/}
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
        {/* Floating Chat Box */}
        {showChat && (
          <div className="fixed right-5 bottom-5 w-auto h-96 bg-white border rounded-xl shadow-lg z-50 flex flex-col">
            <div className="flex justify-between items-center p-3 border-b">
              <p className="font-semibold">{profileInfo.username}</p>
              <button onClick={handleCloseChat} className="text-gray-500 hover:text-gray-800">
                ✕
              </button>
            </div>
            <div className="flex-1 p-3 overflow-y-auto">
              {/* Messages will go here */}
              <p className="text-gray-400 text-sm">No messages yet</p>
            </div>
      <ChatInputBox onSend={(msg) => console.log("Message sent:", msg)} />
          </div>
        )}
      </Container>
      {/*</div> */}
    </div>
  );
};
