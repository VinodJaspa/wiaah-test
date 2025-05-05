import { NumberShortner } from "@UI/components/helpers";
import { ShadcnFlex, ShadcnIcon, ShadcnStack, ShadcnText } from "@UI/components/shadcn-components";
import { Carousel } from "@blocks/Carousel";
import { useSocialControls } from "@blocks/Layout";
import { PostViewPopup } from "@blocks/Popups";
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
      <ShadcnFlex className={`py-2 justify-around ${className}`}>
        <ShadcnStack
          data-testid="PostInteractionLikes"
          className="cursor-pointer flex flex-col"
          onClick={() => handleInteraction("like")}
        >
          {!isLiked?.status ? (
            <ShadcnIcon
              onClick={onHeartIConClick}
              as={HiOutlineHeart}
              className="text-4xl text-primary"
            />

          ) : (
            <ShadcnIcon
              onClick={onHeartIConClick}
              as={HiHeart}
              className="text-4xl text-primary"
            />

          )}
          <ShadcnText className="font-semibold capitalize">
            {NumberShortner(isLiked?.reactions)}
          </ShadcnText>

        </ShadcnStack>
        <ShadcnStack
          data-testid="PostInteractionComments"
          className="cursor-pointer flex flex-col items-center"
          onClick={() => handleInteraction("comment")}
        >
          <ShadcnIcon as={HiOutlineChat} className="text-4xl text-primary" />
          <ShadcnText className="font-semibold capitalize">
            {NumberShortner(comments)}
          </ShadcnText>
        </ShadcnStack>

        <ShadcnStack
          data-testid="PostInteractionShares"
          className="cursor-pointer flex flex-col items-center"
          onClick={() =>
            shareLink(getUrl((routes) => routes.visitSocialPost(postId)))
          }
        >
          <ShadcnIcon as={HiShare} className="text-4xl text-primary" />
          <ShadcnText className="font-semibold capitalize">
            {NumberShortner(shares)}
          </ShadcnText>
        </ShadcnStack>

      </ShadcnFlex>

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
