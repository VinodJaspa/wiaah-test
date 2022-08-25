import React from "react";
import { MdVerified } from "react-icons/md";
import {
  SubscribersPopup,
  Avatar as CustomAvatar,
  SocialStoriesModal,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Button,
  CalenderIcon,
  FlagIcon,
} from "ui";
import { useLoginPopup, useStory } from "ui/Hooks";
import { NumberShortner } from "utils";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { SocialStoryState } from "ui/state";
import { HiOutlineMail, HiDotsVertical } from "react-icons/hi";
import { EllipsisText } from "ui";
import { BiLink } from "react-icons/bi";
import { useReactPubsub } from "react-pubsub";
import { AvatarGroup, useDisclosure, Avatar } from "@chakra-ui/react";
import { SocialShopProfileData } from "api";

export interface SocialProfileProps {
  shopInfo: SocialShopProfileData;
  onFollow?: () => void;
}

export const SocialProfile: React.FC<SocialProfileProps> = ({
  onFollow,
  shopInfo,
}) => {
  const { t } = useTranslation();
  const { emit } = useReactPubsub((keys) => keys.serviceModal);
  const { newStory, OpenStories, removeNewStory } = useStory();
  const storyData = useRecoilValue(SocialStoryState);
  const { OpenLoginPopup } = useLoginPopup();

  function handleOpenStory() {
    OpenStories();
    removeNewStory();
  }

  function handleOpenLogin() {
    OpenLoginPopup();
    onFollow && onFollow();
  }
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: subscriptionsIsOpen,
    onOpen: subscriptionsOnOpen,
    onClose: subscriptionsOnClose,
  } = useDisclosure();

  return (
    <div className="flex flex-col items-center bg-transparent justify-between md:bg-primary px-4 py-2 text-white text-[1.5rem]">
      {storyData && <SocialStoriesModal />}
      <SubscribersPopup
        title={t("subscribers", "subscribers")}
        isOpen={isOpen}
        onClose={onClose}
      />
      <SubscribersPopup
        title={t("subscriptions", "subscriptions")}
        isOpen={subscriptionsIsOpen}
        onClose={subscriptionsOnClose}
      />
      <div className="flex w-full justify-between">
        <div />
        <CustomAvatar
          className="bg-black h-[5rem] w-[5rem]"
          name={shopInfo.name}
          src={shopInfo.thumbnail}
          newStory={newStory}
          onClick={handleOpenStory}
        />
        <Menu>
          <MenuButton>
            <HiDotsVertical onClick={handleOpenLogin} cursor={"pointer"} />
          </MenuButton>
          <MenuList className="text-black">
            <MenuItem>{t("Report")}</MenuItem>
            <MenuItem>{t("Share")}</MenuItem>
            <MenuItem>{t("Block")}</MenuItem>
            <MenuItem>{t("Copy Url")}</MenuItem>
            <MenuItem>{t("Hide All Posts")}</MenuItem>
          </MenuList>
        </Menu>
      </div>
      <div className="bg-primary md:bg-transparent items-center flex mb-2 px-1 rounded-lg gap-2">
        <p>{shopInfo.name}</p>
        {shopInfo.verified && <MdVerified className="text-xl" />}
      </div>
      <div className="flex gap-4 leading-7">
        <div
          className="flex items-center cursor-pointer gap-2"
          onClick={handleOpenLogin}
        >
          <p className="font-bold">{NumberShortner(shopInfo.publications)}</p>
          <p className="text-lg">{t("publications")}</p>
        </div>
        <div
          className="flex items-center cursor-pointer"
          onClick={subscriptionsOnOpen}
        >
          <div className="flex gap-2 items-center mx-2">
            <AvatarGroup mr="0.7rem" max={3} spacing="-2.8em">
              {[...Array(3)].map((_, i) => (
                <Avatar
                  borderWidth={"1px"}
                  borderColor="white"
                  rounded={"lg"}
                  size={"xs"}
                  h="2em"
                  w="2em"
                  key={i}
                  bgColor={"black"}
                  src="/shop.jpeg"
                  name="test"
                />
              ))}
            </AvatarGroup>
            <p className="font-bold">
              {NumberShortner(shopInfo.subscriptions)}
            </p>
          </div>
          <p className="text-lg">{t("Subscriptions")}</p>
        </div>
        <div className="flex items-center cursor-pointer" onClick={onOpen}>
          <div className="flex gap-2 items-center mx-2">
            <AvatarGroup mr="0.7rem" max={3} spacing="-2.8em">
              {[...Array(3)].map((_, i) => (
                <Avatar
                  borderWidth={"1px"}
                  borderColor="white"
                  rounded={"md"}
                  size={"xs"}
                  h="2em"
                  w="2em"
                  key={i}
                  bgColor={"black"}
                  src="/shop-2.jpeg"
                  name="test"
                />
              ))}
            </AvatarGroup>
            <p className="font-bold">{NumberShortner(shopInfo.subscribers)}</p>
          </div>

          <p className="text-lg">{t("Subscribers")}</p>
        </div>
      </div>
      <div className="flex gap-2 flex-col py-4 w-full text-lg">
        {shopInfo.bio && (
          <EllipsisText
            showMoreColor="primary.main"
            maxLines={4}
            content={shopInfo.bio}
          />
        )}
        {shopInfo.links && (
          <div className="flex flex-col">
            {shopInfo.links.map((link, i) => (
              <div className="flex items-center gap-1" key={i}>
                <BiLink className="text-white text-xl" />
                <a>{link}</a>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Button
          className={`${
            shopInfo.isFollowed ? "bg-secondaryRed" : "bg-primary"
          } border shadow-lg px-8 border-black`}
          colorScheme={shopInfo.isFollowed ? "danger" : "primary"}
          onClick={handleOpenLogin}
        >
          {shopInfo.isFollowed
            ? t("Unfollow")
            : shopInfo.public
            ? t("follow")
            : t("ask for follow")}
        </Button>
        <HiOutlineMail
          aria-label={t("Message Seller")}
          className="rounded-full p-2 h-12 w-12 bg-primary text-sm text-white"
        />

        <CalenderIcon
          onClick={() => emit({ id: "123" })}
          className="text-sm md:text-3xl cursor-pointer"
        />
      </div>
      <div className="bg-white flex bg-opacity-20 md:bg-transparent gap-2 w-full items-center justify-end pt-3">
        <p className="text-lg">
          <FlagIcon code={shopInfo.location.countryCode} />
        </p>
        <p className="tex-white text-lg">
          {shopInfo.location.address}, {shopInfo.location.state},{" "}
          {shopInfo.location.city} {shopInfo.location.address}
        </p>
      </div>
    </div>
  );
};
