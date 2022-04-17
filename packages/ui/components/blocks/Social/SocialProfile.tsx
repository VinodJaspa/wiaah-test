import React from "react";
import { Flex, Icon, Text, Button, useDisclosure } from "@chakra-ui/react";
import { BiMessageAltDetail } from "react-icons/bi";
import { CgMoreVertical } from "react-icons/cg";
import { ShopScoialProfileInfo } from "types/market/Social";
import { MdVerified } from "react-icons/md";
import { Avatar } from "ui";
import { FlagIcon } from "react-flag-kit";
import { SubscribersPopup } from "./SubscribersPopup";
import { useLoginPopup, useStory } from "../../../Hooks";
import { NumberShortner } from "../../helpers/numberShortener";
import { SocialStoriesModal } from "./SocialStoriesModal";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { SocialStoryState } from "../../../state";

export interface SocialProfileProps {
  shopInfo: ShopScoialProfileInfo;
  onFollow?: () => void;
}

export const SocialProfile: React.FC<SocialProfileProps> = ({
  onFollow,
  shopInfo,
}) => {
  const { t } = useTranslation();
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
    <Flex
      // gap="0.5rem"
      align={"center"}
      bg={{ md: "primary.main" }}
      p="1rem"
      color={"white"}
      fontSize="1.5rem"
      justify={"space-between"}
      direction={"column"}
    >
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
      <Flex w="100%" justify={"space-between"}>
        <Icon
          onClick={handleOpenLogin}
          cursor={"pointer"}
          as={CgMoreVertical}
        />
        <Avatar
          name={shopInfo.name}
          photoSrc={shopInfo.thumbnail}
          newStory={newStory}
          size={"2xl"}
          onClick={handleOpenStory}
        />
        <Icon
          onClick={handleOpenLogin}
          cursor={"pointer"}
          rotate={180}
          as={BiMessageAltDetail}
        />
      </Flex>
      <Flex
        bgColor={{ base: "primary.main", md: "transparent" }}
        align={"center"}
        my="0.5rem"
        px="0.25rem"
        rounded={"lg"}
        gap="0.5rem"
      >
        <Text>{shopInfo.name}</Text>
        {shopInfo.verifed && <Icon fontSize={"x-large"} as={MdVerified} />}
      </Flex>
      <Flex lineHeight={"1.8rem"} gap="1rem">
        <Flex
          onClick={handleOpenLogin}
          direction={"column"}
          align={"center"}
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>
            {NumberShortner(shopInfo.publications)}
          </Text>
          <Text textTransform={"capitalize"}>
            {t("publications", "publications")}
          </Text>
        </Flex>
        <Flex
          direction={"column"}
          align="center"
          onClick={subscriptionsOnOpen}
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>
            {NumberShortner(shopInfo.subscriptions)}
          </Text>
          <Text textTransform={"capitalize"}>
            {t("subscriptions", "subscriptions")}
          </Text>
        </Flex>
        <Flex
          direction={"column"}
          align="center"
          onClick={onOpen}
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>
            {NumberShortner(shopInfo.subscribers)}
          </Text>
          <Text textTransform={"capitalize"}>
            {t("subscribers", "Subscribers")}
          </Text>
        </Flex>
      </Flex>
      <Button
        ring={"0px"}
        _focus={{ ring: "0px" }}
        rounded={"md"}
        my="0.5rem"
        borderWidth={"1px"}
        boxShadow={"lg"}
        px="2rem"
        borderColor="black"
        colorScheme={"primary.main"}
        onClick={handleOpenLogin}
        textTransform="capitalize"
      >
        {shopInfo.public
          ? t("follow", "follow")
          : t("ask_for_follow", "ask for follow")}
      </Button>
      <Flex
        bg={{ base: "whiteAlpha.200", md: "transparent" }}
        gap="0.5rem"
        w="100%"
        align={"center"}
        justify={"end"}
      >
        <Text fontSize={"lg"}>
          <FlagIcon code={shopInfo.countryCode} />
        </Text>
        <Text color={{ base: "black", md: "white" }} fontSize={"md"}>
          {shopInfo.location}
        </Text>
      </Flex>
    </Flex>
  );
};
