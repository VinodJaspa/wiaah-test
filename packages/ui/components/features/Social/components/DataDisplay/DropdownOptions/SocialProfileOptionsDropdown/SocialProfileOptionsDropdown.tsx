import React from "react";
import { useTranslation } from "react-i18next";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useSocialReportModal,
} from "@UI";

export interface SocialProfileOptionsDropdownProps {
  profileId: string;
}

export const SocialProfileOptionsDropdown: React.FC<
  SocialProfileOptionsDropdownProps
> = ({ profileId, children }) => {
  const { OpenModal } = useSocialReportModal();
  const { t } = useTranslation();
  return (
    <Menu>
      <MenuButton>{children}</MenuButton>
      <MenuList className="text-black ">
        <MenuItem onClick={() => OpenModal(profileId)}>{t("Report")}</MenuItem>
        <MenuItem>{t("Turn off  commenting")}</MenuItem>
        <MenuItem>{t("Copy link")}</MenuItem>
        <MenuItem>{t("Disable notifications")}</MenuItem>
        <MenuItem className="text-red-500" onClick={() => OpenModal(profileId)}>
          {t("Block")}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
