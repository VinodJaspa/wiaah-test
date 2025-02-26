import { Divider } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  SpinnerFallback,
  useGetMyNotificationsQuery,
} from "@UI";
import { CalendarArrowUp, Heart, MessageCircle, X } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "utils";
export interface NotifiactionsMenuProps {
  children?: React.ReactNode;
}

export const NotifiactionsMenu: React.FC<NotifiactionsMenuProps> = ({
  children,
}) => {
  const [selectedTab, setSelectedTab] = useState<number>(1);
  const { data, isLoading, isError } = useGetMyNotificationsQuery();
  const { t } = useTranslation();

  const tabs = [
    { id: 1, label: "All" },
    { id: 2, label: "Mentions" },
    { id: 3, label: "Likes" },
    { id: 4, label: "Orders & Perks" },
  ];

  const notifications = [
    {
      id: 1,
      tab: 3,
      icon: Heart,
      title: "New Like",
      desc: "Your post received a new like",
      arrived: "5 minutes ago",
    },
    {
      id: 2,
      tab: 2,
      icon: MessageCircle,
      title: "New Mention",
      desc: "Your were mentioned in a comment",
      arrived: "7 minutes ago",
    },
    {
      id: 3,
      tab: 4,
      icon: CalendarArrowUp,
      title: "New Order",
      desc: "Your have received a new order",
      arrived: "9 minutes ago",
    },
  ];

  return (
    <div className="relative">
      <Menu>
        <MenuButton>{children}</MenuButton>
        <MenuList
          origin="top right"
          className="max-h-[40rem] px-4 w-[min(100vw,31.25rem)] thinScroll overflow-x-hidden overflow-y-scroll"
        >
          <SpinnerFallback isLoading={isLoading} isError={isError}>
            <div className="flex flex-col gap-y-4">
              <div className="flex items-center justify-between">
                <p className="font-bold text-lg">{t("Notifications")}</p>
                <X size={16} />
              </div>

              {/* Tabs */}
              <div className="relative grid grid-cols-4 text-center bg-gray-100 rounded-md font-medium h-10 p-1">
                {tabs.map((tab) => (
                  <button
                    onClick={() => setSelectedTab(tab.id)}
                    className="relative z-[2]"
                    key={tab.id}
                  >
                    <span>{tab.label}</span>
                  </button>
                ))}
                <div
                  className="absolute left-1 top-1 h-8 bg-white rounded transition-transform duration-300 z-[1]"
                  style={{
                    width: `calc((100% - 8px) / ${tabs.length})`,
                    transform: `translateX(${(selectedTab - 1) * 100}%)`,
                  }}
                />
              </div>

              {/* Tab Content */}
              <div className="flex flex-col gap-y-2">
                {/* All */}
                {selectedTab === 1 &&
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-4 flex items-start gap-2 bg-gray-100 rounded-md"
                    >
                      <div className="p-2 bg-white flex items-center justify-center rounded-full">
                        <notification.icon
                          className={cn(
                            notification.tab === 2 && "text-blue-500",
                            notification.tab === 3 && "text-rose-500",
                            notification.tab === 4 && "text-green-500",
                          )}
                        />
                      </div>
                      <div className="flex flex-col">
                        <h6 className="text-lg font-medium">
                          {notification.title}
                        </h6>
                        <p className="text-base">{notification.desc}</p>
                        <p className="text-sm text-gray-400">
                          {notification.arrived}
                        </p>
                      </div>
                    </div>
                  ))}
                {/* Mentions */}
                {selectedTab === 2 &&
                  notifications
                    .filter((n) => n.tab === 2)
                    .map((notification) => (
                      <div
                        key={notification.id}
                        className="p-4 flex items-start gap-2 bg-gray-100 rounded-md"
                      >
                        <div className="p-2 bg-white flex items-center justify-center rounded-full">
                          <notification.icon
                            className={cn(
                              notification.tab === 2 && "text-blue-500",
                              notification.tab === 3 && "text-rose-500",
                              notification.tab === 4 && "text-green-500",
                            )}
                          />
                        </div>
                        <div className="flex flex-col">
                          <h6 className="text-lg font-medium">
                            {notification.title}
                          </h6>
                          <p className="text-base">{notification.desc}</p>
                          <p className="text-sm text-gray-400">
                            {notification.arrived}
                          </p>
                        </div>
                      </div>
                    ))}
                {/* Likes */}
                {selectedTab === 3 &&
                  notifications
                    .filter((n) => n.tab === 3)
                    .map((notification) => (
                      <div
                        key={notification.id}
                        className="p-4 flex items-start gap-2 bg-gray-100 rounded-md"
                      >
                        <div className="p-2 bg-white flex items-center justify-center rounded-full">
                          <notification.icon
                            className={cn(
                              notification.tab === 2 && "text-blue-500",
                              notification.tab === 3 && "text-rose-500",
                              notification.tab === 4 && "text-green-500",
                            )}
                          />
                        </div>
                        <div className="flex flex-col">
                          <h6 className="text-lg font-medium">
                            {notification.title}
                          </h6>
                          <p className="text-base">{notification.desc}</p>
                          <p className="text-sm text-gray-400">
                            {notification.arrived}
                          </p>
                        </div>
                      </div>
                    ))}
                {/* Orders */}
                {selectedTab === 4 &&
                  notifications
                    .filter((n) => n.tab === 4)
                    .map((notification) => (
                      <div
                        key={notification.id}
                        className="p-4 flex items-start gap-2 bg-gray-100 rounded-md"
                      >
                        <div className="p-2 bg-white flex items-center justify-center rounded-full">
                          <notification.icon
                            className={cn(
                              notification.tab === 2 && "text-blue-500",
                              notification.tab === 3 && "text-rose-500",
                              notification.tab === 4 && "text-green-500",
                            )}
                          />
                        </div>
                        <div className="flex flex-col">
                          <h6 className="text-lg font-medium">
                            {notification.title}
                          </h6>
                          <p className="text-base">{notification.desc}</p>
                          <p className="text-sm text-gray-400">
                            {notification.arrived}
                          </p>
                        </div>
                      </div>
                    ))}
              </div>

              <Divider />

              {/* Mark All As Read */}
              <button className="block border rounded-md p-2 text-center font-medium hover:bg-gray-100">
                Mark All as Read
              </button>
            </div>
          </SpinnerFallback>
        </MenuList>
      </Menu>
    </div>
  );
};
