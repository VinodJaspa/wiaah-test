import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useGetNotifications, SpinnerFallback, NotifiactionCard } from "ui";
import React from "react";
const test = null;
export interface NotifiactionsMenuProps {}

export const NotifiactionsMenu: React.FC<NotifiactionsMenuProps> = ({
  children,
}) => {
  const { data, isLoading, isError } = useGetNotifications();
  return (
    <Menu isLazy lazyBehavior="unmount">
      <MenuButton>{children}</MenuButton>

      <MenuList maxH={"25rem"} overflowY="scroll" className="thinScroll">
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
