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
import EllipsisText from "../EllipsisText";
import { CommentsViewer } from "ui";
import { useLoginPopup } from "ui/Hooks";

export interface PostCardProps {
  profileInfo: ProfileInfo;
  postInfo: PostInfo;
  showComments?: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({
  postInfo,
  profileInfo,
  showComments,
}) => {
  const { OpenLoginPopup } = useLoginPopup();

  return (
    <Flex
      bg="white"
      gap="0.5rem"
      p="1rem"
      style={{ boxShadow: "0px 3px 15px -5px gray" }}
      rounded="lg"
      w="100%"
      direction={"column"}
    >
      {profileInfo && (
        <PostHead
          createdAt={postInfo.createdAt}
          creatorName={profileInfo.name}
          creatorPhoto={profileInfo.thumbnail}
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
        onInteraction={() => OpenLoginPopup()}
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
