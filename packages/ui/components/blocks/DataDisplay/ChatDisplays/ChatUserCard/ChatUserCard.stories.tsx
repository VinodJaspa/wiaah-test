import { ChatUserCard, storybookChatDisplay } from "@UI";
import { Meta } from "@storybook/react";
import { ChatUserStatus } from "@UI/../types/src";
export const placeholderUser = {
  onClick: () => {},
  id: "user123",
  name: "Jane Doe",
  profilePhoto: "https://example.com/profile-photo.jpg",
  status: "online" as ChatUserStatus, // Adjust this value based on your ChatUserStatus type
  typing: "Typing...",
  unSeenMsgs: 5,
  lastMsgSentTime: new Date().toISOString(),
  lastMsg: "Hey, how's it going?",
};

export default {
  title: "UI / blocks / Chat Display /ChatUserCard",
  component: ChatUserCard,
} as Meta<typeof ChatUserCard>;

export const Default = () => <ChatUserCard {...placeholderUser} />;
