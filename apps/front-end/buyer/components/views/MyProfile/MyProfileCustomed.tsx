import React from "react";
import { useTranslation } from "react-i18next";
import {
  SubscribersPopup,
  Avatar,
  SocialStoryModal,
  QrcodeDisplay,
  VerifiedIcon,
  Stack,
  Divider,
  LinkIcon,
  HStack,
  Button,
  EditIcon,
  SocialProfileInfo,
  Account,
  getRandomImage,
} from "ui";
import { NumberShortner } from "ui/components/helpers";
import { useReactPubsub } from "react-pubsub";
import { useRecoilValue } from "recoil";
import { useDisclouser } from "hooks";
import { mapArray } from "utils";
import { SocialShopProfileData } from "api";
import { useRouting } from "routing";
import { Profile } from "@features/API";

export interface MyProfileProps {
  shopInfo: Profile;
}

export const MyProfileCustomed: React.FC<MyProfileProps> = ({ shopInfo }) => {
  const { t } = useTranslation();
  const { isOpen, handleClose, handleOpen } = useDisclouser();

  const {
    isOpen: subscriptionsIsOpen,
    handleOpen: subscriptionsOnOpen,
    handleClose: subscriptionsOnClose,
  } = useDisclouser();

  const { getUrl } = useRouting();

  if (!shopInfo) return null;

  return (
    <div className="flex flex-col w-full bg-primary h-80 relative rounded-2xl ">
      <div className="flex flex-col h-[11rem] w-full  items-end justify-center pt-6 px-8 gap-3 text-white">
        <div className="flex flex-col gap-3 items-center">
          <QrcodeDisplay
            value={getUrl((r) => r.visitSellerSocialProfile(shopInfo))}
            color="#ffffff"
            transparentBg
            className={"w-16 fill-white"}
          />
          <p>{t("Show on map")}</p>
        </div>
      </div>
      {/*
      {shopInfo && <SocialStoryModal profileId={shopInfo.id} />}
      */}
      <SubscribersPopup
        title={t("subscribers", "subscribers")}
        isOpen={isOpen}
        onClose={handleClose}
      />
      <SubscribersPopup
        title={t("subscriptions", "subscriptions")}
        isOpen={subscriptionsIsOpen}
        onClose={subscriptionsOnClose}
      />
      <div
        style={{
          boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.08)",
        }}
        className="absolute w-full bg-white border-2 border-white bottom-0 left-0 h-36 pl-14 pr-8 py-6 flex gap-12"
      >
        <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <div className="absolute left-14 top-0 -translate-y-1/2">
              <Avatar
                className="w-[6.75rem] h-[6.75rem]"
                src={shopInfo?.photo || getRandomImage()}
                name={shopInfo?.username}
              />
            </div>
            <div className="w-24 h-full"></div>

            <HStack className="gap-3">
              <p className="ml-2 text-xl whitespace-nowrap font-bold">
                {shopInfo?.username}
              </p>
              <p className="text-sm font-light whitespace-nowrap w-fit text-grayText">
                {shopInfo?.profession}
              </p>
              {shopInfo.verified ? (
                <VerifiedIcon className="text-xl text-primary" />
              ) : null}
            </HStack>
          </div>
          <Stack divider={<Divider variant="vert" className="mx-[1.25rem]" />}>
            <HStack>
              <p className="font-bold text-lg">
                {NumberShortner(shopInfo?.publications)}
              </p>
              <p>{t("Posts")}</p>
            </HStack>

            <HStack className="cursor-pointer" onClick={() => handleOpen()}>
              <p className="font-bold text-lg">
                {NumberShortner(shopInfo?.followers)}
              </p>
              <p>{t("Followers")}</p>
            </HStack>

            <HStack
              className="cursor-pointer"
              onClick={() => subscriptionsOnOpen()}
            >
              <p className="font-bold text-lg">
                {NumberShortner(shopInfo?.following)}
              </p>
              <p>{t("Following")}</p>
            </HStack>
          </Stack>
        </div>

        <div className="flex flex-col w-full gap-1">
          <p className="font-semibold text-lg">{t("Bio")}</p>
          <p className="font-light text-base text-lightBlack">
            {shopInfo?.bio}
          </p>
          <div className="flex flex-wrap gap-2">
            {/* {mapArray(links, (link, i) => (
              <HStack key={i} className="flex gap-2">
                <LinkIcon className="text-base text-primary" />
                <p className="text-base text-black font-light underline underline-offset-4">
                  {link}
                </p>
              </HStack>
            ))} */}
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <Button className="flex items-center gap-2 whitespace-nowrap">
            <EditIcon />
            {t("Edit Profile")}
          </Button>
        </div>
      </div>
    </div>
  );
};
