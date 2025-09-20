import React from "react";
import { SocialStoryModal, StorySeenByPopup, useStoryModal } from "ui";

export const StoryModal = () => {
  const [userId, setUserId] = React.useState<string>();
  const { Listen } = useStoryModal();

  Listen((props) => {
    if (props && props.userId) {
      setUserId(props.userId);
    } else {
      setUserId(null);
    }
  });

  return (
    <>
      <SocialStoryModal />
      <StorySeenByPopup />
    </>
  );
};
