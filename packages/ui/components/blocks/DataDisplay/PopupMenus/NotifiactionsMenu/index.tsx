
import NotificationsList from "@blocks/Cards/NotificationCard/NotificationsList";
import {
  Menu,
  MenuButton,
  MenuList,
  SpinnerFallback,

} from "@UI";
import { CalendarArrowUp, Heart, MessageCircle, X } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "utils";
export interface NotifiactionsMenuProps {
  children?: React.ReactNode;
}

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

export const NotifiactionsMenu: React.FC<NotifiactionsMenuProps> = ({
  children,
}) => {
  const [selectedTab, setSelectedTab] = useState<number>(1);
  // const { data, isLoading, isError } = useGetMyNotificationsQuery();
const { t } = useTranslation();

  return (
    <div className="relative">
      <Menu>
        <MenuButton>{children}</MenuButton>
        <MenuList
          origin="top right"
          className="h-[40rem] px-4 w-[min(100vw,31.25rem)] thinScroll overflow-x-hidden overflow-y-scroll relative"
        >
          <NotificationsList/>
        </MenuList>
      </Menu>
    </div>
  );
};

export const NotificationCard = ({ notification }) => {
  return (
    <div className="p-4 flex items-start gap-2 bg-gray-100 rounded-md">
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
        <h6 className="text-lg font-medium">{notification.title}</h6>
        <p className="text-base">{notification.desc}</p>
        <p className="text-sm text-gray-400">{notification.arrived}</p>
      </div>
    </div>
  );
};
