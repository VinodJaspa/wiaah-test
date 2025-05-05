import { useRouting } from "@UI/../routing";
import { useClipboard } from "@UI/../utils/src";
import { useSocialControls } from "@blocks";
import { ContentHostType } from "@features/API";
import { Menu, MenuButton, MenuItem, MenuList } from "@partials";
import React from "react";
import { useTranslation } from "react-i18next";

export const SocialPostOptionsDropdown: React.FC<{
  postId: string;
  children?: React.ReactNode;
}> = ({ postId, children }) => {
  const { copy } = useClipboard();
  const { getUrl } = useRouting();
  const { reportContent } = useSocialControls();
const { t } = useTranslation();

  return (
    <Menu>
      <MenuButton>{children}</MenuButton>
      <MenuList className="text-black ">
        <MenuItem
          onClick={() => reportContent(postId, ContentHostType.PostNewsfeed)}
        >
          {t("Report")}
        </MenuItem>
        {/* TODO: bind api endpoint */}
        <MenuItem>{t("Turn off  commenting")}</MenuItem>
        <MenuItem
          onClick={() => {
            copy(getUrl((r) => r.visitSocialPost(postId)));
          }}
        >
          {t("Copy link")}
        </MenuItem>
        {/* TODO: bind api endpoint */}
        <MenuItem>{t("Disable notifications")}</MenuItem>
        {/* TODO: bind api endpoint */}
        <MenuItem className="text-red-500">{t("Block")}</MenuItem>
      </MenuList>
    </Menu>
  );
};
