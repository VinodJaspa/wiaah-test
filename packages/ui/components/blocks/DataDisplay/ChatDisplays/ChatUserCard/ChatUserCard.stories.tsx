import { ChatUserCard, storybookChatDisplay } from "@UI";
import { ComponentMeta } from "@storybook/react";
import { ChatUserStatus } from "@UI/../types/src";
export const placeholderUser = {
  onClick: () => { },
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
  title: storybookChatDisplay + "ChatUserCard",
  component: ChatUserCard,
} as ComponentMeta<typeof ChatUserCard>;

export const Default = () => <ChatUserCard {...placeholderUser} />;
