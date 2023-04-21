import { PostCardInfo } from "@UI/../types/src";
import { newsfeedPosts } from "@UI/placeholder";
import { PostAttachmentsViewer } from "@blocks/DataDisplay";
import {
  AddNewPostModal,
  AddNewStoryModal,
  CommentReportModal,
} from "@blocks/Modals";
import { PostViewPopup } from "@blocks/Popups";
import { SocialShareCotentModal } from "@features/Social";
import { useSetNewPost } from "@src/index";
import React from "react";

export const useSocialControls = () => {
  const { OpenModal } = useSetNewPost();

  return {
    openSocialNewPostModal: (id: string, userId?: string) => {},
  };
};

export const SocialLayout: React.FC = ({ children }) => {
  return (
    <>
      <AddNewPostModal />
      <SocialShareCotentModal />
      <PostViewPopup
        fetcher={async ({ queryKey }) => {
          const id = queryKey[1].postId;
          const post = newsfeedPosts.find((post) => post.postInfo.id === id);
          return post ? post : null;
        }}
        queryName="newFeedPost"
        idParam="newsfeedpostid"
        renderChild={(props: PostCardInfo) => {
          return (
            <PostAttachmentsViewer
              attachments={props.postInfo.attachments}
              profileInfo={props.profileInfo}
              carouselProps={{
                arrows: true,
              }}
            />
          );
        }}
      />
      <StoryModal />
      <AddNewPostModal />
      <AddNewStoryModal />
      <CommentReportModal />
      <>{children}</>
    </>
  );
};
