import React from "react";
import { Box, Flex } from "@chakra-ui/react";
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
  return (
    <Flex
      bg="white"
      gap="0.5rem"
      p="1rem"
      boxShadow={"main"}
      rounded="lg"
      maxW="100%"
      overflow={"auto"}
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
      {postInfo.attachments && postInfo.attachments.length > 1 ? (
        <ControlledCarousel
          arrows={postInfo.attachments.length > 1}
          gap={32}
          onCurrentActiveChange={setActive}
        >
          {postInfo.attachments.map((attachment, i) => (
            <PostAttachment
              play={i === active}
              key={attachment.src + i}
              type={attachment.type}
              src={attachment.src}
              alt={profileInfo && profileInfo.name}
            />
          ))}
        </ControlledCarousel>
      ) : (
        postInfo.attachments &&
        postInfo.attachments.length === 1 && (
          <PostAttachment
            {...postInfo.attachments[0]}
            alt={profileInfo && profileInfo.name}
          />
        )
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
