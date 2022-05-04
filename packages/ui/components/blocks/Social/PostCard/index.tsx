import React from "react";
import { Box, Flex, HStack, Icon, Text, FlexProps } from "@chakra-ui/react";
import { ProfileInfo, PostInfo } from "types/market/Social";
import {
  PostInteractions,
  CommentInput,
  PostHead,
  HashTags,
  PostAttachment,
  CommentsViewer,
  ChakraCarousel,
  EllipsisText,
} from "ui";
import { useLoginPopup, useStory } from "ui/Hooks";
import { useRouter } from "next/router";
import { ControlledCarousel } from "../../ControlledCarousel";
import { HiLocationMarker, HiUser } from "react-icons/hi";
import { PostAttachmentsViewer } from "../../DataDisplay";

export interface PostCardProps {
  profileInfo: ProfileInfo;
  postInfo: PostInfo;
  showComments?: boolean;
  profileFunctional?: boolean;
  newStory?: boolean;
  innerProps?: FlexProps;
}

export const PostCard: React.FC<PostCardProps> = ({
  postInfo,
  profileInfo,
  showComments,
  profileFunctional,
  newStory,
  innerProps,
}) => {
  const [active, setActive] = React.useState(0);
  const router = useRouter();
  const { OpenLoginPopup } = useLoginPopup();
  const { removeNewStory } = useStory();
  function handleOpenLogin() {
    OpenLoginPopup;
  }
  function handleProfileClick() {
    if (profileFunctional) {
      removeNewStory();
    } else {
      router.push("localhost:3002/social/wiaah/newsfeed-post/15");
    }
  }
  function handleViewPost() {
    router.push("/", { query: { postId: postInfo.id } }, { shallow: true });
  }
  return (
    <Flex
      bg="white"
      gap="0.25rem"
      // p="1rem"
      rounded="lg"
      maxW="100%"
      overflow={"hidden"}
      direction={"column"}
      {...innerProps}
    >
      {profileInfo && (
        <PostHead
          createdAt={postInfo.createdAt}
          creatorName={profileInfo.name}
          creatorPhoto={profileInfo.thumbnail}
          newStory={newStory}
          functional={profileFunctional}
          onProfileClick={handleProfileClick}
          onViewPostClick={handleViewPost}
        />
      )}
      {postInfo.content && (
        <EllipsisText wordBreak content={postInfo.content} maxLines={3} />
      )}
      <HashTags
        style={{ pb: "0.5" }}
        color="primary.main"
        tags={postInfo.tags}
      />
      <PostAttachmentsViewer
        attachments={postInfo.attachments || []}
        profileInfo={profileInfo}
        carouselProps={{
          bg: "black",
          arrows: false,
          h: "calc(100% - 14rem)",
        }}
      />
      <PostInteractions
        onInteraction={handleOpenLogin}
        shares={0}
        comments={postInfo.numberOfComments}
        likes={postInfo.numberOfLikes}
      />
      <CommentInput />
      {showComments && (
        <CommentsViewer
          comments={postInfo.comments || []}
          maxInitailComments={4}
        />
      )}
    </Flex>
  );
};
