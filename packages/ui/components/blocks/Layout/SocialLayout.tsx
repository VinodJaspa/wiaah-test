import { AddNewPostModal } from "@blocks/Modals";
import { PostViewPopup } from "@blocks/Popups";
import { SocialShareCotentModal } from "@features/Social";
import { useSetNewPost } from "@src/index";
import React from "react";

export const useSocialControls = () => {
  const { OpenModal } = useSetNewPost();

  return {
    openSocialNewPostModal: OpenModal,
  };
};

export const SocialLayout: React.FC = ({ children }) => {
  return (
    <>
      <AddNewPostModal />
      <PostViewPopup />
      <SocialShareCotentModal />
      <>{children}</>
    </>
  );
};
