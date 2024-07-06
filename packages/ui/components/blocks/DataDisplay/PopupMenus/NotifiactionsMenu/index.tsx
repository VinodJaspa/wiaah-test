import {
  useGetNotifications,
  SpinnerFallback,
  NotifiactionCard,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  useGetMyNotificationsQuery,
} from "@UI";
import { isToday } from "@UI/../utils/src";
import React from "react";
import { useTranslation } from "react-i18next";
export interface NotifiactionsMenuProps {
  children?: React.ReactNode;
}

export const NotifiactionsMenu: React.FC<NotifiactionsMenuProps> = ({
  children,
}) => {
  const { data, isLoading, isError } = useGetMyNotificationsQuery();
  const { t } = useTranslation();
  return (
    <div className="relative">
      <Menu>
        <MenuButton>{children}</MenuButton>
        <MenuList
          origin="top right"
          className="max-h-[22.625rem] p-2 w-[min(100vw,31.25rem)] thinScroll overflow-x-hidden overflow-y-scroll"
        >
          <SpinnerFallback isLoading={isLoading} isError={isError}>
            <p className="font-bold text-lg">{t("Today")}</p>
            {Array.isArray(data) &&
              data.data.map((noti, i) => (
                <MenuItem key={noti.id + i}>
                  <NotifiactionCard
                    username={noti.author?.profile?.username}
                    createdAt={noti.createdAt}
                    // TODO: bind order id from notification
                    orderId={"132456"}
                    type={noti.type}
                    count={1}
                    thumbnail={noti.author?.profile?.photo}
                    seen={!isToday(new Date(noti.createdAt))}
                  />
                </MenuItem>
              ))}
          </SpinnerFallback>
        </MenuList>
      </Menu>
      {data && data.total && data.total > 0 ? (
        <div className="h-4 w-4 text-[0.5rem] border-2 border-white absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 rounded-full flex items-center justify-center text-white bg-primary">
          {data.total}
        </div>
      ) : null}
    </div>
  );
};
