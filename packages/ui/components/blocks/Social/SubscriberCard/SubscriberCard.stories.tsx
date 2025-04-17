import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { SubscriberCard } from "@UI";
import { SubscribersUsersPlaceholder } from "placeholder";
export default {
  title: "UI/blocks/Social/SubscriberCard",
  component: SubscriberCard,
} as Meta<typeof SubscriberCard>;

const Template: StoryFn<typeof SubscriberCard> = (args) => (
  <div className="w-full text-black">
    <SubscriberCard {...args} />
  </div>
);

export const Default = {
  render: Template,

  args: {
    ...SubscribersUsersPlaceholder[0],
  },
};
