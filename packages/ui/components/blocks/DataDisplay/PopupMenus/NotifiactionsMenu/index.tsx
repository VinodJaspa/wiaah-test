import {
  useGetNotifications,
  SpinnerFallback,
  NotifiactionCard,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  Stack,
  Divider,
} from "ui";
import React from "react";
import { useTranslation } from "react-i18next";
export interface NotifiactionsMenuProps {}

export const NotifiactionsMenu: React.FC<NotifiactionsMenuProps> = ({
  children,
}) => {
  const { data, isLoading, isError } = useGetNotifications();
  const { t } = useTranslation();
  return (
    <Menu>
      <MenuButton>{children}</MenuButton>
      <MenuList
        origin="top right"
        className="max-h-[22.625rem] p-2 w-[min(100vw,31.25rem)] thinScroll overflow-x-hidden overflow-y-scroll"
      >
        <SpinnerFallback isLoading={isLoading} isError={isError}>
          <p className="font-bold text-lg">{t("Today")}</p>
          {Array.isArray(data) &&
            data.map((notifaction, i) => (
              <MenuItem key={notifaction.id + i}>
                <NotifiactionCard notificationDetails={notifaction} />
              </MenuItem>
            ))}
        </SpinnerFallback>
      </MenuList>
    </Menu>
  );
};
