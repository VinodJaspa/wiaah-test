import React from "react";
import { useTranslation } from "react-i18next";
import { ChatMessage, Divider, useUserData } from "@UI";
import { MessageAttachmentType } from "@features/API";

export interface ChatMessageType {
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

export interface ChatMessageAttachmentType {
  type: MessageAttachmentType;
  src: string;
}

export interface ChatRoomContentProps {
  messages: ChatMessageType[];
}

export const ChatRoomContent: React.FC<ChatRoomContentProps> = ({
  messages,
}) => {
const { t } = useTranslation();

  const { user } = useUserData();

  const dates = messages.reduce(
    (acc, curr, idx) => {
      const notSame =
        new Date(acc.lastDate).getDate() !== new Date(curr.sendDate).getDate();

      const lastDate = notSame
        ? new Date(curr.sendDate)
        : new Date(acc.lastDate);

      return {
        lastDate: lastDate,
        dates: {
          ...acc.dates,
          [idx]: notSame ? new Date(curr.sendDate) : null,
        },
      };
    },
    {} as { lastDate: Date; dates: Record<number, Date | null> },
  );

  return (
    <div className="flex flex-col py-4 justify-end gap-1 h-full w-full  overflow-y-scroll">
      {[...messages, { ...messages[0], userId: user?.id || "1" }].map(
        (msg, i) => {
          const d = dates.dates[i];
          return (
            <>
              {/* {d ? (
              <div className="flex items-center gap-2">
                <Divider />
                <span className="text-center w-full">{d.toDateString()}</span>
                <Divider />
              </div>
            ) : null} */}
              <ChatMessage
                messageData={{
                  ...msg,
                  seen: true,
                  showUser:
                    messages[i + 1]?.userId !== msg.userId ||
                    typeof messages[i + 1] !== "object",
                }}
                key={i}
              />
            </>
          );
        },
      )}
    </div>
  );
};
