import React from "react";
import { useTranslation } from "react-i18next";
import { ChatMessageType } from "types";
import { ChatMessage, Divider } from "ui";
export interface ChatRoomContentProps {
  messages: ChatMessageType[];
}

export const ChatRoomContent: React.FC<ChatRoomContentProps> = ({
  messages,
}) => {
  const { t } = useTranslation();

  return (
    <div className="justify-end gap-4 w-full p-4 bg-[#fefefe] flex flex-col h-full overflow-y-scroll overflow-x-hidden  thinScroll">
      <div className="flex items-center gap-2">
        <Divider />
        <span>{t("today", "Today")}</span>
        <Divider />
      </div>
      {messages.map((msg, i) => (
        <ChatMessage messageData={msg} key={i} />
      ))}
    </div>
  );
};
