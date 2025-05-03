import React from "react";
import { useTranslation } from "react-i18next";
import {
  useUserData,
  DisplayDate,
  useLocale,
  Avatar,
  useResponsive,
  CheckmarkCircleFillIcon,
  CheckmarkCircleOutlineIcon,
} from "@UI";
import { ChatMessageAttachment } from "@UI";
import { AttachmentType, MessageAttachmentType } from "@features/API";
import { mapArray } from "@UI/../utils/src";
import { ChatMessageAttachmentType } from "../ChatRoomContent";

interface ChatMessageType {
  id: string;
  userId: string;
  username: string;
  userPhoto: string;
  sendDate: string | number;
  messageContent?: string;
  messageAttachments?: ChatMessageAttachmentType[];
  seen: boolean;
  showUser: boolean;
}

export interface ChatMessageProps {
  messageData: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ messageData }) => {
  const { locale } = useLocale();
  const { user } = useUserData();
const { t } = useTranslation();
  if (!messageData) return null;
  const { isMobile } = useResponsive();

  const {
    id,
    sendDate,
    username,
    messageAttachments,
    messageContent,
    userPhoto,
    seen,
    showUser,
    userId,
  } = messageData;
  const isUser = user && user.id === userId;

  const justifyPos = isUser ? "justify-end" : "justify-start";

  const alignPos = isUser ? "items-end" : "items-start";

  const flexDir = isUser ? "flex-row" : "flex-row-reverse";

  const name = isUser ? t("You") : username;

  const msgBgColor = isUser ? "bg-primary" : "bg-[#F4F4F4]";
  const msgTextColor = isUser ? "text-white" : "text-black";
  const msgRadius = isUser
    ? "rounded-tr-none rounded-xl"
    : "rounded-tl-none rounded-xl";

  return isMobile ? (
    <div className={`${justifyPos} w-full flex`}>
      <div className={`${justifyPos} ${flexDir} flex gap-2`}>
        <div className={`${alignPos} flex flex-col gap-1`}>
          {messageContent && messageContent.length > 0 ? (
            <p
              className={`${msgBgColor} ${msgTextColor} w-fit px-4 py-2 rounded-full`}
            >
              {messageContent}
            </p>
          ) : null}

          {mapArray(messageAttachments, (attachment, i) => (
            <div
              className={` ${attachment.type === MessageAttachmentType.VoiceMessage
                  ? ""
                  : "max-w-[min(100%,10rem)]"
                } `}
              key={i}
            >
              <ChatMessageAttachment attachment={attachment} />
            </div>
          ))}
        </div>

        <div className="flex items-end h-full">
          {!showUser ? (
            <div className="min-w-[1.75rem]" />
          ) : isUser ? (
            seen ? (
              <CheckmarkCircleFillIcon className="text-black fill-white stroke-white" />
            ) : (
              <CheckmarkCircleOutlineIcon className="text-black" />
            )
          ) : (
            <Avatar
              className="min-w-[1.75rem]"
              src={userPhoto}
              alt={username}
              name={username}
            />
          )}
        </div>
      </div>
    </div>
  ) : (
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
              className={`w-fit py-1 px-2 ${msgTextColor} ${msgBgColor} ${msgRadius}`}
            >
              {messageContent}
            </span>
          )}
          {Array.isArray(messageAttachments) &&
            messageAttachments.map((attachment, i) => (
              <div
                className={`py-1 px-2 ${attachment.type === MessageAttachmentType.VoiceMessage
                    ? ""
                    : "max-w-[min(100%,20rem)]"
                  }  ${msgBgColor} ${msgRadius}`}
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
