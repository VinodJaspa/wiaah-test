import {
  Flex,
  VStack,
  Icon,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { CgPlayButtonR } from "react-icons/cg";
import { HiHeart, HiOutlineChat, HiShare, HiUserGroup } from "react-icons/hi";
import { Interaction, Interactions, ShareMotheds } from "types";
import { NumberShortner } from "@UI/components/helpers/numberShortener";
import { FaFacebook, FaTwitter, FaWhatsapp, FaPinterest } from "react-icons/fa";

export interface PostInteractionsProps {
  likes: number;
  comments: number;
  onInteraction?: (intraction: Interaction) => any;
  onShare?: (shareMothed: ShareMotheds) => any;
}

export const PostInteractions: React.FC<PostInteractionsProps> = ({
  comments,
  likes,
  onInteraction,
  onShare,
}) => {
  const { t } = useTranslation();
  function handleInteraction(type: Interactions) {
    onInteraction && onInteraction({ type });
  }

  function handleShare(mothed: ShareMotheds) {
    onShare && onShare(mothed);
  }

  return (
    <Flex py="0.5rem" justify={"space-around"}>
      <VStack
        data-testid="PostInteractionLikes"
        cursor={"pointer"}
        onClick={() => handleInteraction("like")}
      >
        <Icon fontSize={"xx-large"} fill={"primary.main"} as={HiHeart} />
        <Text fontWeight={"semibold"} textTransform={"capitalize"}>
          {NumberShortner(likes)} {t("likes", "likes")}
        </Text>
      </VStack>
      <VStack
        data-testid="PostInteractionComments"
        cursor={"pointer"}
        onClick={() => handleInteraction("comment")}
      >
        <Icon
          fontSize={"xx-large"}
          stroke={"primary.main"}
          as={HiOutlineChat}
        />
        <Text fontWeight={"semibold"} textTransform={"capitalize"}>
          {NumberShortner(comments)} {t("comments", "comments")}
        </Text>
      </VStack>
      <Menu isLazy lazyBehavior="unmount" placement="left-start">
        <MenuButton>
          <VStack
            data-testid="PostInteractionShares"
            cursor={"pointer"}
            onClick={() => handleInteraction("share")}
          >
            <Icon fontSize={"xx-large"} fill={"primary.main"} as={HiShare} />
            <Text fontWeight={"semibold"} textTransform={"capitalize"}>
              {t("shares", "shares")}
            </Text>
          </VStack>
        </MenuButton>
        <MenuList zIndex={10}>
          <MenuItem onClick={() => handleShare("story")}>
            <HStack>
              <Icon as={CgPlayButtonR} />
              <Text>{t("share_on_story", "Share on story")}</Text>
            </HStack>
          </MenuItem>
          <MenuItem onClick={() => handleShare("followers")}>
            <HStack>
              <Icon as={HiUserGroup} />
              <Text>{t("share_with_follwers", "Share With Followers")}</Text>
            </HStack>
          </MenuItem>
          <MenuItem onClick={() => handleShare("facebook")}>
            <HStack>
              <Icon as={FaFacebook} />
              <Text>{t("share_on_facebook", "Share on Facebook")}</Text>
            </HStack>
          </MenuItem>
          <MenuItem onClick={() => handleShare("twitter")}>
            <HStack>
              <Icon as={FaTwitter} />
              <Text>{t("share_on_twitter", "Share on Twitter")}</Text>
            </HStack>
          </MenuItem>
          <MenuItem onClick={() => handleShare("whatsapp")}>
            <HStack>
              <Icon as={FaWhatsapp} />
              <Text>{t("share_on_whatsapp", "Share on Whatsapp")}</Text>
            </HStack>
          </MenuItem>
          <MenuItem onClick={() => handleShare("pinterest")}>
            <HStack>
              <Icon as={FaPinterest} />
              <Text>{t("share_on_pinterest", "Share on Pinterest")}</Text>
            </HStack>
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
