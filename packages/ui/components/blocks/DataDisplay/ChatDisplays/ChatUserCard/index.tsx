import React from "react";
import { EllipsisText, useLocale, Avatar, AvatarBadge } from "@UI";
import { useTranslation } from "react-i18next";

export type ChatUserStatus = "online" | "offline" | "idle";

export interface ChatUserCardProps {
  onClick: () => any;
  id: string;
  name: string;
  profilePhoto: string;
  status: ChatUserStatus;
  typing?: string;
  unSeenMsgs: number;
  lastMsgSentTime?: string;
  lastMsg?: string;
}

export const ChatUserCard: React.FC<ChatUserCardProps> = ({
  id,
  lastMsgSentTime,
  profilePhoto,
  status,
  typing,
  unSeenMsgs,
  name,
  lastMsg,
  onClick,
}) => {
  const { locale } = useLocale();
  const { t } = useTranslation();
  return (
    <div
      onClick={onClick}
      className="flex w-full px-4 py-2 cursor-pointer hover:bg-gray-100"
    >
      <div className="flex gap-2 items-center w-full">
        <Avatar name={name} src={profilePhoto}>
          <AvatarBadge
            className={`${
              status === "online"
                ? "bg-primary"
                : status === "idle"
                ? "bg-yellow-400"
                : "bg-gray-500"
            }`}
          />
        </Avatar>
        <div className="flex w-full flex-col">
          <span className="font-bold">{name}</span>
          {typing ? (
            <span className="text-primary">
              {typing} {t("is typing")}
            </span>
          ) : lastMsg ? (
            <EllipsisText ShowMore={false} content={lastMsg} maxLines={1} />
          ) : null}
        </div>
      </div>
      <div className="flex gap-2 text-sm items-end flex-col">
        {lastMsgSentTime && (
          <span className="font-semibold text-gray-500 whitespace-nowrap">
            {new Date(lastMsgSentTime).toLocaleString(locale || "en-us", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </span>
        )}
        {unSeenMsgs > 0 && (
          <div className="flex justify-center rounded-full p-1 bg-red-600 items-center w-[1.5em] h-[1.5em] text-white">
            <span>{unSeenMsgs}</span>
          </div>
        )}
      </div>
    </div>
  );
};
