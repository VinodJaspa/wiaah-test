import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { SubscribersList } from "@UI";
import { SubscribersUsersPlaceholder } from "../../../../placeholder";
export default {
  title: "UI/blocks/Social/SubscribersList",
  component: SubscribersList,
} as Meta<typeof SubscribersList>;

const Template: StoryFn<typeof SubscribersList> = (args) => (
  <div className="w-full text-black">
    <SubscribersList {...args} />
  </div>
);

export const Default = {
  render: Template,

  args: {
    title: "Subscibers",
    users: SubscribersUsersPlaceholder,
  },
};
