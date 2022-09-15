import React from "react";
import { useTranslation } from "react-i18next";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HorizontalDotsIcon,
  useSocialReportModal,
} from "ui";

export interface SocialProfileOptionsDropdownProps {
  profileId: string;
}

export const SocialProfileOptionsDropdown: React.FC<
  SocialProfileOptionsDropdownProps
> = ({ profileId }) => {
  const { OpenModal } = useSocialReportModal();
  const { t } = useTranslation();
  return (
    <Menu>
      <MenuButton>
        <HorizontalDotsIcon className="cursor-pointer" />
      </MenuButton>
      <MenuList className="text-black w-48">
        <MenuItem onClick={() => OpenModal(profileId)}>{t("Report")}</MenuItem>
      </MenuList>
    </Menu>
  );
};
