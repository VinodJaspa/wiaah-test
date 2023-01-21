import React from "react";
import {
  Avatar,
  DisplayPostedSince,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@partials";
import { MdClose } from "react-icons/md";
import { HiEye, HiDotsHorizontal } from "react-icons/hi";
import { NumberShortner } from "@UI/components/helpers/numberShortener";
import { useTranslation } from "react-i18next";
import { useStorySeenByPopup } from "../StorySeenByPopup";

export interface SocialStoryViewerHeaderProps {
  user: {
    name: string;
    thumbnail: string;
  };
  createdAt: string;
  views: number;
  newStory?: boolean;
  onClose?: () => any;
  storyId: string;
}

export const SocialStoryViewerHeader: React.FC<
  SocialStoryViewerHeaderProps
> = ({ user, views, createdAt, newStory, onClose, storyId }) => {
  const { t } = useTranslation();
  const { open } = useStorySeenByPopup();
  return (
    <div className="flex text-xl gap-8 w-full flex-col">
      <div className="flex w-full justify-between">
        <MdClose
          className="cursor-pointer"
          onClick={() => onClose && onClose()}
        />
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
      <div className="w-full justify-between">
        <HStack className="cursor-pointer" onClick={() => open(storyId)}>
          <p>{NumberShortner(views)}</p>
          <HiEye />
        </HStack>
        <DisplayPostedSince ago since={createdAt} />
      </div>
    </div>
  );
};
