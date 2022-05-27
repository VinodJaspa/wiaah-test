import { userCards, storybookChatDisplay, ChatUserCard } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookChatDisplay + "ChatUserCard",
  component: ChatUserCard,
} as ComponentMeta<typeof ChatUserCard>;

export const Default = () => <ChatUserCard {...userCards[0]} />;
