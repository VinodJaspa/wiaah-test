import React from "react";
import { Flex } from "@chakra-ui/react";
import { ProfileInfo, PostInfo } from "types/market/Social";
import {
  PostInteractions,
  CommentInput,
  PostHead,
  HashTags,
  PostAttachment,
} from "ui";
import { EllipsisText } from "ui";
import { CommentsViewer } from "ui";
import { useLoginPopup, useStory } from "ui/Hooks";
import { useRouter } from "next/router";

export interface PostCardProps {
  profileInfo: ProfileInfo;
  postInfo: PostInfo;
  showComments?: boolean;
  profileFunctional?: boolean;
  newStory?: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({
  postInfo,
  profileInfo,
  showComments,
  profileFunctional,
  newStory,
}) => {
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
  return (
    <Flex
      bg="white"
      gap="0.5rem"
      p="1rem"
      boxShadow={"main"}
      rounded="lg"
      w="100%"
      direction={"column"}
    >
      {profileInfo && (
        <PostHead
          createdAt={postInfo.createdAt}
          creatorName={profileInfo.name}
          creatorPhoto={profileInfo.thumbnail}
          newStory={newStory}
          functional={profileFunctional}
          onProfileClick={handleProfileClick}
        />
      )}
      {postInfo.content && (
        <EllipsisText wordBreak content={postInfo.content} maxLines={3} />
      )}
      <HashTags color="primary.main" tags={postInfo.tags} />
      {postInfo.attachment && (
        <PostAttachment
          type={postInfo.attachment.type}
          src={postInfo.attachment.src}
          alt={profileInfo && profileInfo.name}
        />
      )}
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
