import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PostCommentPlaceholder } from "placeholder";
import { PostReplyCard } from ".";

export default {
  title: "UI/blocks/Social/ReplyCard",
  component: PostReplyCard,
} as ComponentMeta<typeof PostReplyCard>;

const Template: ComponentStory<typeof PostReplyCard> = (args) => (
  <PostReplyCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...PostCommentPlaceholder,
};
