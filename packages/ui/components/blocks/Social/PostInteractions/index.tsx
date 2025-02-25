import { NumberShortner } from "@UI/components/helpers";
import { useSocialControls } from "@blocks/Layout";
import { Flex, Icon, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  HiHeart,
  HiOutlineChat,
  HiOutlineHeart,
  HiShare,
} from "react-icons/hi";
import { useRouting } from "routing";
import { Interaction, Interactions, ShareMotheds } from "types";

export interface PostInteractionsProps {
  likes: number;
  comments: number;
  shares: number;
  onInteraction?: (intraction: Interaction) => any;
  onShare?: (shareMothed: ShareMotheds) => any;
  className?: string;
  onHeartIConClick?: () => void;
  isLiked?: { status: boolean; reactions: number };
  postId?: string;
}

export const PostInteractions: React.FC<PostInteractionsProps> = ({
  comments,
  likes,
  shares,
  onInteraction,
  onShare,
  className,
  onHeartIConClick,
  isLiked,
  postId,
}) => {
  const { t } = useTranslation();
  const { shareLink, showContentComments } = useSocialControls();
  const { getUrl } = useRouting();

  function handleInteraction(type: Interactions) {
    onInteraction && onInteraction({ type });
  }

  function handleShare(mothed: ShareMotheds) {
    onShare && onShare(mothed);
  }

  return (
    <Flex py="0.5rem" justify={"space-around"} className={className}>
      <VStack
        data-testid="PostInteractionLikes"
        cursor={"pointer"}
        onClick={() => handleInteraction("like")}
      >
        {!isLiked?.status ? (
          <Icon
            onClick={onHeartIConClick}
            fontSize={"xx-large"}
            fill={"primary.main"}
            as={HiOutlineHeart}
          />
        ) : (
          <Icon
            onClick={onHeartIConClick}
            fontSize={"xx-large"}
            fill={"primary.main"}
            as={HiHeart}
          />
        )}
        <Text fontWeight={"semibold"} textTransform={"capitalize"}>
          {NumberShortner(isLiked?.reactions)}
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
          {NumberShortner(comments)}
        </Text>
      </VStack>
      <VStack
        data-testid="PostInteractionShares"
        cursor={"pointer"}
        onClick={() =>
          shareLink(getUrl((routes) => routes.visitSocialPost(postId)))
        }
      >
        <Icon fontSize={"xx-large"} fill={"primary.main"} as={HiShare} />
        <Text fontWeight={"semibold"} textTransform={"capitalize"}>
          {NumberShortner(shares)}
        </Text>
      </VStack>
    </Flex>
  );
};
