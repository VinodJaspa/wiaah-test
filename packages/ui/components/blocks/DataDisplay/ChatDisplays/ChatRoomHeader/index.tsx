import React from "react";
import { useTranslation } from "react-i18next";
import { BiPhone, BiVideo } from "react-icons/bi";
import { HiDotsHorizontal } from "react-icons/hi";
import {
  useResponsive,
  Avatar,
  HStack,
  ArrowLeftIcon,
  Verified,
  useDateDiff,
  DotIcon,
  ArrowLeftAlt1Icon,
  VerticalDotsIcon,
} from "@UI";
import { runIfFn } from "@UI/../utils/src";
import { ActiveStatus } from "@features/API";
export interface ChatRoomHeaderProps {
  data: {
    thumbnail: string;
    lastActive: string;
    activeStatus: ActiveStatus;
    id: string;
    userId: string;
    name: string;
    verified: boolean;
  };
  onCloseRoom?: () => any;
}

const rightIcons: { icon: React.ReactNode; label: string }[] = [
  {
    label: "start a video call",
    icon: <BiVideo />,
  },
  {
    label: "start a voice call",
    icon: <BiPhone />,
  },
  {
    label: "more options",
    icon: <HiDotsHorizontal />,
  },
];

export const ChatRoomHeader: React.FC<ChatRoomHeaderProps> = ({
  data,
  onCloseRoom,
}) => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();

  const { getSince } = useDateDiff({
    from: new Date(data.lastActive),
    to: new Date(),
  });

  const activeSince = getSince();

  return isMobile ? (
    <HStack className="justify-between pb-2 bg-white">
      <HStack className="gap-5">
        <ArrowLeftAlt1Icon onClick={onCloseRoom} />
        <HStack>
          <Avatar src={data.thumbnail} className="w-[2.625rem]" />
          <div>
            <HStack>
              <p className="text-lg font-semibold text-black">{data.name}</p>
              {data?.verified ? <Verified className="text-primary" /> : null}
            </HStack>
            {data.activeStatus === ActiveStatus.Active ? (
              <ChatUserActiveStatusIndicator
                showText
                status={data.activeStatus}
              />
            ) : (
              <p className="text-xs text-[#686868]">
                {t("Active")} {activeSince.value} {activeSince.timeUnit}
              </p>
            )}
          </div>
        </HStack>
      </HStack>
      <VerticalDotsIcon className="mr-2" />
    </HStack>
  ) : (
    <div className="flex items-center gap-2 p-2 border-gray-200 justify-between">
      <div className="flex items-center gap-2">
        <Avatar name={data.name} src={data.thumbnail} />
        <div className="flex flex-col justify-between">
          <span className="text-xl font-bold">{data.name}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {rightIcons.map((icon, i) => runIfFn(icon.icon))}
      </div>
    </div>
  );
};

export const ChatUserActiveStatusIndicator: React.FC<{
  status: ActiveStatus;
  showText?: boolean;
}> = ({ status, showText }) => {
  const { t } = useTranslation();

  const _status: {
    className: string;
    label: string;
    key: ActiveStatus;
  }[] = [
      {
        className: "bg-primary",
        key: ActiveStatus.Active,
        label: t("Active"),
      },
      {
        className: "bg-yellow-600",
        key: ActiveStatus.Idle,
        label: t("Idle"),
      },
      {
        className: "bg-gray-600",
        key: ActiveStatus.InActive,
        label: t("Offline"),
      },
      {
        className: "bg-red-600",
        key: ActiveStatus.DoNotDisturb,
        label: t("Do not disturb"),
      },
    ];

  const currentStats =
    _status.find((v) => v.key === status) ||
    _status.find((v) => v.key === ActiveStatus.InActive);

  return (
    <HStack>
      <div
        className={`${currentStats?.className || ""} h-2 w-2 rounded-full`}
      />
      {showText ? <p>{currentStats?.label || ""}</p> : null}
    </HStack>
  );
};
