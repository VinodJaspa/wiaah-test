import React from "react";
import {
  Flex,
  Icon,
  Text,
  Button,
  useDisclosure,
  HStack,
  IconButton,
  AvatarGroup,
  Avatar,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { BiMessage, BiMessageAltDetail } from "react-icons/bi";
import { CgMoreVertical } from "react-icons/cg";
import { ShopScoialProfileInfo } from "types/market/Social";
import { MdVerified } from "react-icons/md";
import { FlagIcon } from "react-flag-kit";
import {
  SubscribersPopup,
  Avatar as CustomAvatar,
  SocialStoriesModal,
} from "ui";
import { useLoginPopup, useStory } from "ui/Hooks";
import { NumberShortner } from "ui/components/helpers/numberShortener";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { SocialStoryState } from "ui/state";
import { HiPaperClip, HiOutlineMail, HiDotsVertical } from "react-icons/hi";
import EllipsisText from "../../EllipsisText";
import { BiLink } from "react-icons/bi";

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
        <Menu>
          <MenuButton h={"fit-content"}>
            <Icon
              onClick={handleOpenLogin}
              cursor={"pointer"}
              as={HiDotsVertical}
            />
          </MenuButton>
          <MenuList fontSize={"initial"} color="black">
            <MenuItem textTransform={"uppercase"}>
              {t("report", "Report")}
            </MenuItem>
            <MenuItem textTransform={"uppercase"}>
              {t("share", "Share")}
            </MenuItem>
            <MenuItem textTransform={"uppercase"}>
              {t("block", "Block")}
            </MenuItem>
            <MenuItem textTransform={"uppercase"}>
              {t("copy_url", "Copy Url")}
            </MenuItem>
            <MenuItem textTransform={"uppercase"}>
              {t("hide_all_posts", "Hide All Posts")}
            </MenuItem>
          </MenuList>
        </Menu>
        <CustomAvatar
          bgColor={"black"}
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
        mb="0.5rem"
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
          direction={"row"}
          align={"center"}
          cursor={"pointer"}
          gap="0.5em"
        >
          <Text fontWeight={"bold"}>
            {NumberShortner(shopInfo.publications)}
          </Text>
          <Text fontSize={"md"} textTransform={"capitalize"}>
            {t("publications", "publications")}
          </Text>
        </Flex>
        <Flex align="center" onClick={subscriptionsOnOpen} cursor={"pointer"}>
          <HStack mx="0.5rem">
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
            <Text fontWeight={"bold"}>
              {NumberShortner(shopInfo.subscriptions)}
            </Text>
          </HStack>
          <Text fontSize={"md"} textTransform={"capitalize"}>
            {t("subscriptions", "subscriptions")}
          </Text>
        </Flex>
        <Flex align="center" onClick={onOpen} cursor={"pointer"}>
          <HStack mx="0.5rem">
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
            <Text fontWeight={"bold"}>
              {NumberShortner(shopInfo.subscribers)}
            </Text>
          </HStack>

          <Text fontSize={"md"} textTransform={"capitalize"}>
            {t("subscribers", "Subscribers")}
          </Text>
        </Flex>
      </Flex>
      <Flex
        gap="0.5rem"
        direction={"column"}
        py="1rem"
        fontSize={"md"}
        w="100%"
      >
        {shopInfo.bio && (
          <EllipsisText
            showMoreColor="primary.main"
            maxLines={4}
            content={shopInfo.bio}
          />
        )}
        {shopInfo.links && (
          <Flex direction={"column"}>
            {shopInfo.links.map((link, i) => (
              <HStack key={i}>
                <Icon color={"white"} fontSize="xl" as={BiLink} />
                <Link color="blue" href={link}>
                  {link}
                </Link>
              </HStack>
            ))}
          </Flex>
        )}
      </Flex>

      <HStack spacing={"1rem"}>
        <Button
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
        <IconButton
          aria-label={t("message_seller", "Message Seller")}
          as={HiOutlineMail}
          rounded="full"
          p="0.5rem"
          h="3rem"
          w="3rem"
          bgColor={"green.400"}
          size="sm"
          colorScheme={"whiteAlpha"}
          color="white"
        />
      </HStack>
      <Flex
        bg={{ base: "whiteAlpha.200", md: "transparent" }}
        gap="0.5rem"
        w="100%"
        align={"center"}
        justify={"end"}
        pt="0.75rem"
      >
        <Text fontSize={"lg"}>
          <FlagIcon code={shopInfo.countryCode} />
        </Text>
        <Text color={"white"} fontSize={"md"}>
          {shopInfo.location}
        </Text>
      </Flex>
    </Flex>
  );
};
