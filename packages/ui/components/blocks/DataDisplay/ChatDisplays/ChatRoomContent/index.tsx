import React from "react";
import { useTranslation } from "react-i18next";
import { ChatMessage, Divider } from "@UI";
import { MessageAttachmentType } from "@features/API";

export interface ChatMessageType {
  id: string;
  username: string;
  userPhoto: string;
  sendDate: string | number;
  messageContent?: string;
  messageAttachments?: ChatMessageAttachmentType[];
}

export interface ChatMessageAttachmentType {
  type: MessageAttachmentType;
  src: string;
}

export type MessageAttachmentTypes = "image" | "video" | "audio" | "story";

export interface ChatRoomContentProps {
  messages: ChatMessageType[];
}

export const ChatRoomContent: React.FC<ChatRoomContentProps> = ({
  messages,
}) => {
  const { t } = useTranslation();

  const dates = messages.reduce((acc, curr, idx) => {
    const notSame =
      new Date(acc.lastDate).getDate() !== new Date(curr.sendDate).getDate();

    const lastDate = notSame ? new Date(curr.sendDate) : new Date(acc.lastDate);

    return {
      lastDate: lastDate,
      dates: {
        ...acc.dates,
        [idx]: notSame ? new Date(curr.sendDate) : null,
      },
    };
  }, {} as { lastDate: Date; dates: Record<number, Date | null> });

  return (
    <div className="justify-end gap-4 w-full p-4 bg-[#fefefe] inline-grid thinScroll overflow-y-scroll">
      {messages.map((msg, i) => {
        const d = dates.dates[i];
        return (
          <>
            {d ? (
              <div className="flex items-center gap-2">
                <Divider />
                <span className="text-center w-full">{d.toDateString()}</span>
                <Divider />
              </div>
            ) : null}
            <ChatMessage messageData={msg} key={i} />
          </>
        );
      })}
    </div>
  );
};
