import { getDateLabel, isToday, mapArray } from "@UI/../utils/src";
import { NotifiactionCard, SpinnerFallback, useSocialControls } from "@blocks";
import { useGetMyNotificationsQuery } from "@features/notifications/useGetMyNotificationsQuery";
import {
  ArrowLeftAlt1Icon,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
} from "@partials";
import React from "react";
import { useTranslation } from "react-i18next";

export const NotifciationsDrawer: React.FC = () => {
  const { t } = useTranslation();
  const { closeNotifications, value } = useSocialControls("viewNotifications");
  const { data, isLoading, isError } = useGetMyNotificationsQuery();

  return (
    <Drawer
      spaceBottom="2.5rem"
      isOpen={!!value}
      position="bottom"
      full
      onClose={closeNotifications}
    >
      <DrawerContent>
        <div className="p-4 relative flex justify-center items-center">
          <div className="absolute top-1/2 left-4 -translate-y-1/2">
            <DrawerCloseButton>
              <ArrowLeftAlt1Icon />
            </DrawerCloseButton>
          </div>
          <p className="text-lg font-semibold w-full text-center">
            {t("Notifications")}
          </p>
        </div>
        <SpinnerFallback isLoading={isLoading} isError={isError}>
          <div className="px-2 flex flex-col gap-5">
            {mapArray(data?.data, (v, i) => {
              const label = getDateLabel(
                new Date(v.createdAt).toUTCString(),
                new Date(data?.data.at(i - 1)?.createdAt).toUTCString()
              );
              return (
                <div>
                  {label ? (
                    <div className="mb-2 text-[0.813rem] text-[#7E7E7E]">
                      <p>{label}</p>
                    </div>
                  ) : null}
                  <NotifiactionCard
                    username={v.author?.profile?.username}
                    createdAt={v.createdAt}
                    orderId={"18642"}
                    type={v.type}
                    count={1}
                    thumbnail={v.author?.profile?.photo}
                    seen={!isToday(new Date(v.createdAt))}
                  />
                </div>
              );
            })}
          </div>
        </SpinnerFallback>
      </DrawerContent>
    </Drawer>
  );
};
