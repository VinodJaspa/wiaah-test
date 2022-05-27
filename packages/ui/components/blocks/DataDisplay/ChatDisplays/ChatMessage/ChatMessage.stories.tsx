import {
  ChatMessagesPH,
  useUserData,
  storybookChatDisplay,
  ChatMessage,
} from "ui";
import { ComponentMeta } from "@storybook/react";
import React from "react";

export default {
  title: storybookChatDisplay + "ChatMessage",
  component: ChatMessage,
} as ComponentMeta<typeof ChatMessage>;

export const TextMessage = () => (
  <ChatMessage messageData={ChatMessagesPH[0]} />
);
export const WithImageAttachedMessage = () => (
  <ChatMessage messageData={ChatMessagesPH[1]} />
);
export const WithVideoAttachedMessage = () => (
  <ChatMessage messageData={ChatMessagesPH[4]} />
);

export const RecievedMessage = () => (
  <ChatMessage messageData={ChatMessagesPH[1]} />
);
export const SentMessage = () => {
  const { initUserData } = useUserData();
  React.useEffect(() => {
    initUserData({
      name: "Wiaah",
      email: "WiaahMarket@dev.com",
      accountType: "seller",
      photoSrc: "/wiaah_logo.png",
      id: "123",
    });
  }, []);
  return <ChatMessage messageData={ChatMessagesPH[3]} />;
};
