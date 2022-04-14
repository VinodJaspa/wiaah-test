import { Flex, VStack, Icon, Text } from "@chakra-ui/react";
import { t } from "i18next";
import React from "react";
import { HiHeart, HiOutlineChat, HiShare } from "react-icons/hi";
import { Interaction, Interactions } from "types/market/Social";
import { NumberShortner } from "../../helpers/numberShortener";

export interface PostInteractionsProps {
  likes: number;
  comments: number;
  shares?: number;
  onInteraction?: (intraction: Interaction) => any;
}

export const PostInteractions: React.FC<PostInteractionsProps> = ({
  comments,
  likes,
  shares,
  onInteraction,
}) => {
  function handleInteraction(type: Interactions) {
    onInteraction && onInteraction({ type });
  }

  return (
    <Flex py="0.5rem" justify={"space-around"}>
      <VStack>
        <Icon fontSize={"xx-large"} fill={"primary.main"} as={HiHeart} />
        <Text
          onClick={() => handleInteraction("like")}
          fontWeight={"semibold"}
          textTransform={"capitalize"}
        >
          {NumberShortner(likes)} {t("likes", "likes")}
        </Text>
      </VStack>
      <VStack>
        <Icon
          fontSize={"xx-large"}
          stroke={"primary.main"}
          as={HiOutlineChat}
        />
        <Text
          onClick={() => handleInteraction("comment")}
          fontWeight={"semibold"}
          textTransform={"capitalize"}
        >
          {NumberShortner(comments)} {t("comments", "comments")}
        </Text>
      </VStack>
      <VStack cursor={"pointer"} onClick={() => handleInteraction("share")}>
        <Icon fontSize={"xx-large"} fill={"primary.main"} as={HiShare} />
        <Text fontWeight={"semibold"} textTransform={"capitalize"}>
          {t("shares", "shares")}
        </Text>
      </VStack>
    </Flex>
  );
};
