import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getDateLabel, isToday, mapArray } from "@UI/../utils/src";
import {
  NotifiactionCard,
  SpinnerFallback,
  useSocialControls,
} from "@blocks";
import { useGetMyNotificationsQuery } from "@features/notifications/useGetMyNotificationsQuery";
import {
  ArrowLeftAlt1Icon,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
} from "@partials";

export const NotifciationsDrawer: React.FC = () => {
  const { t } = useTranslation();
  const { closeNotifications, value } = useSocialControls("viewNotifications");

  const { data, isLoading, isError } = useGetMyNotificationsQuery();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (data?.data) {
      setNotifications(data.data);
    }
  }, [data]);

  return (
    <Drawer
      spaceBottom="2.5rem"
      isOpen={!!value}
      position="bottom"
      full
      onClose={closeNotifications}
    >
      <DrawerContent>
        {/* Header */}
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

        {/* Content */}
        <SpinnerFallback isLoading={isLoading} isError={isError}>
          <div className="px-2 flex flex-col gap-5">
            {mapArray(notifications, (v, i) => {
              const currentDate = new Date(v.createdAt);
              const previousDate = notifications[i - 1]
                ? new Date(notifications[i - 1].createdAt)
                : null;

              const label = getDateLabel(
                currentDate.toUTCString(),
                previousDate?.toUTCString()
              );

              return (
                <div key={v.id ?? i}>
                  {label && (
                    <div className="mb-2 text-[0.813rem] text-[#7E7E7E]">
                      <p>{label}</p>
                    </div>
                  )}
                  <NotifiactionCard
                    username={v.author?.profile?.username}
                    createdAt={v.createdAt}
                    orderId={"132456"} // Replace with actual `v.orderId` if available
                    type={v.type}
                    count={1}
                    thumbnail={v.author?.profile?.photo}
                    seen={!isToday(currentDate)}
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
