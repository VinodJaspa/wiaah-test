import {
  isThisMonth,
  isThisWeek,
  isToday,
  isYesterday,
  mapArray,
} from "@UI/../utils/src";
import { NotifiactionCard, SpinnerFallback, useSocialControls } from "@blocks";
import { useGetMyNotificationsQuery } from "@features/notifications/useGetMyNotificationsQuery";
import {
  ArrowLeftAlt1Icon,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
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
        <DrawerHeader className="p-4 relative flex justify-center items-center">
          <div className="absolute top-1/2 left-4 -translate-y-1/2">
            <DrawerCloseButton>
              <ArrowLeftAlt1Icon />
            </DrawerCloseButton>
          </div>
          <p className="text-lg font-semibold w-full text-center">
            {t("Notifications")}
          </p>
        </DrawerHeader>
        <SpinnerFallback isLoading={isLoading} isError={isError}>
          <div className="px-2 flex flex-col gap-5">
            {mapArray(data?.data, (v, i) => {
              const date = new Date(v.createdAt);

              const lastNoti = data?.data[i - 1];
              const lastDate = lastNoti ? new Date(lastNoti.createdAt) : null;

              const lastIsToday = lastNoti
                ? isToday(lastNoti?.createdAt)
                : null;

              const lastIsYesterday = lastNoti
                ? isYesterday(lastNoti?.createdAt)
                : null;

              const lastIsThisWeek = lastNoti
                ? isThisWeek(lastNoti?.createdAt)
                : null;

              const lastIsThisMonth = lastNoti
                ? isThisMonth(lastNoti?.createdAt)
                : null;

              const __isToday = isToday(date) && !lastIsToday;

              const __isYesterday = isYesterday(date) && !lastIsYesterday;

              const __isThisWeek =
                isThisWeek(date) && lastDate && lastDate > date;

              const __isThisMonth =
                isThisMonth(date) && lastDate && lastDate > date;

              console.log(v.author?.profile?.username, {
                __isToday,
                __isYesterday,
                __isThisWeek,
                __isThisMonth,
                lastIsToday,
                lastIsYesterday,
                lastIsThisWeek,
                lastIsThisMonth,
              });

              const dateLabel = __isToday
                ? t("Today")
                : __isYesterday
                ? t("Yesterday")
                : __isThisWeek
                ? t("This week")
                : __isThisMonth
                ? t("This month")
                : null;
              return (
                <div>
                  {dateLabel ? (
                    <div className="mb-2 text-[0.813rem] text-[#7E7E7E]">
                      <p>{dateLabel}</p>
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
