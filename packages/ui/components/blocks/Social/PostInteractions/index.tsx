import { NumberShortner } from "@UI/components/helpers";
import { Carousel } from "@blocks/Carousel";
import { useSocialControls } from "@blocks/Layout";
import { PostViewPopup } from "@blocks/Popups";
import { Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { useModalDisclouser } from "hooks";
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
  post?: any;
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
  post,
}) => {
  const { t } = useTranslation();
  const { shareLink, showContentComments } = useSocialControls();
  const { getUrl } = useRouting();

  const { isOpen, handleOpen, handleClose } = useModalDisclouser();

  function handleInteraction(type: Interactions) {
    if (type === "comment") {
      handleOpen();
    }

    onInteraction && onInteraction({ type });
  }

  function handleShare(mothed: ShareMotheds) {
    onShare && onShare(mothed);
  }

  const posts = post ? [post] : [];

  return (
    <>
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

      {post && postId && (
        <PostViewPopup
          fromAffiliation
          posts={posts}
          queryName="newFeedPost"
          data={post}
          idParam="newsfeedpostid"
          isOpen={isOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
          renderChild={(postData: any) => {
            const images = postData.affiliation?.product?.presentations?.map(
              (att: any) => att.src,
            ) || [postData.affiliation?.product?.presentations[0]?.src];

            return (
              <Carousel componentsPerView={1} controls={images.length > 1}>
                {images.map((image: string, index: number) => (
                  <div key={index}>
                    <img
                      src={
                        image ||
                        postData.affiliation?.product?.presentations[0]?.src
                      }
                      alt={`Attachment ${index + 1}`}
                    />
                  </div>
                ))}
              </Carousel>
            );
          }}
        />
      )}
    </>
  );
};
