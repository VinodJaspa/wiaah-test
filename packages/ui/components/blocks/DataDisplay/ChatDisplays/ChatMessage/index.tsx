import React from "react";
import { useTranslation } from "react-i18next";
import { ChatMessageType } from "types";
import { useUserData, DisplayDate, useLocale, Avatar } from "ui";
import { ChatMessageAttachment } from "ui";

export interface ChatMessageProps {
  messageData: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ messageData }) => {
  if (!messageData) return null;
  const { locale } = useLocale();
  const { user } = useUserData();
  const { t } = useTranslation();

  const {
    id,
    sendDate,
    username,
    messageAttachments,
    messageContent,
    userPhoto,
  } = messageData;
  const isUser = user && user.id === id;

  const justifyPos = isUser ? "justify-end" : "justify-start";

  const alignPos = isUser ? "items-end" : "items-start";

  const flexDir = isUser ? "flex-row" : "flex-row-reverse";

  const name = isUser ? t("you", "You") : username;

  const msgBgColor = isUser ? "bg-primary" : "bg-gray-200";
  const msgTextColor = isUser ? "text-white" : "text-black";
  const msgRadius = isUser
    ? "rounded-tr-none rounded-xl"
    : "rounded-tl-none rounded-xl";
  return (
    <div className={`${justifyPos} w-full flex`}>
      <div className={`${flexDir} ${justifyPos} flex gap-2`}>
        <div className={`${alignPos} flex flex-col gap-2 justify-center`}>
          <div className={`${flexDir} flex items-end gap-2`}>
            <DisplayDate
              innerProps={{ style: { fontSize: "xs", color: "gray" } }}
              date={sendDate}
              hours12
              locale={locale}
            />
            <span className="font-bold">{name}</span>
          </div>
          {messageContent && (
            <span
              className={`w-fit py-1 px-2 ${msgTextColor}] ${msgBgColor} ${msgRadius}`}
            >
              {messageContent}
            </span>
          )}
          {Array.isArray(messageAttachments) &&
            messageAttachments.map((attachment, i) => (
              <div
                className={`py-1 px-2 max-w-[min(100%,20rem)]  ${msgBgColor} ${msgRadius}`}
                key={i}
              >
                <ChatMessageAttachment attachment={attachment} />
              </div>
            ))}
        </div>
        <Avatar name={username} photoSrc={userPhoto} />
      </div>
    </div>
  );
};
