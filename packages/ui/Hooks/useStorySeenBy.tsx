import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { StorySeenByUserInfo } from "types/market/Social";
import { StorySeenByPopupOpenState, StorySeenByState } from "ui/state";
export const useStorySeenBy = () => {
  const [isOpen, setOpen] = useRecoilState<boolean>(StorySeenByPopupOpenState);
  const [users, setUsers] = useRecoilState(StorySeenByState);

  function setStorySeenBy(users: StorySeenByUserInfo[]) {
    setUsers(users);
  }
  function OpenStorySeenBy() {
    setOpen(true);
  }
  function CloseStorySeenBy() {
    setOpen(false);
  }

  return {
    isOpen,
    users,
    setStorySeenBy,
    OpenStorySeenBy,
    CloseStorySeenBy,
  };
};
