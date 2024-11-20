import React from "react";
import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@partials";
import { MdClose } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import { useStorySeenByPopup } from "../StorySeenByPopup";

export interface SocialStoryViewerHeaderProps {
  user: {
    name: string;
    thumbnail: string;
  };
  newStory?: boolean;
  onClose?: () => any;
}

export const SocialStoryViewerHeader: React.FC<
  SocialStoryViewerHeaderProps
> = ({ user, newStory, onClose }) => {
  const { t } = useTranslation();
  const { open } = useStorySeenByPopup();
  return (
    <div className="flex text-xl gap-3 w-full flex-col px-2">
      <div className="flex w-full justify-between">
        <MdClose className="cursor-pointer" onClick={onClose} />
        <div className="flex flex-col gap-2 items-center">
          <Avatar
            newStory={newStory}
            showBorder
            name={user.name}
            photoSrc={user.thumbnail}
          />
          <p>{user.name}</p>
        </div>
        <Menu>
          <MenuButton>
            <HiDotsHorizontal />
          </MenuButton>
          <MenuList className="text-black">
            <MenuItem>{t("share")}</MenuItem>
            <MenuItem>{t("copy url")}</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};
