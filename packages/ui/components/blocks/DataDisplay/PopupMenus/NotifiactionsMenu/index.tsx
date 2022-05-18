import {
  useGetNotifications,
  SpinnerFallback,
  NotifiactionCard,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
} from "ui";
import React from "react";
export interface NotifiactionsMenuProps {}

export const NotifiactionsMenu: React.FC<NotifiactionsMenuProps> = ({
  children,
}) => {
  const { data, isLoading, isError } = useGetNotifications();
  return (
    <Menu>
      <MenuButton>{children}</MenuButton>
      <MenuList className="thinScroll max-h-[25rem] overflow-y-scroll">
        <SpinnerFallback isLoading={isLoading} isError={isError}>
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
