import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SubscribersList } from "ui";
import ChakraUiDecorator from "ui/SBDecorators/ChakraUiDecorator";
import { SubscribersUsersPlaceholder } from "../../../../placeholder";
export default {
  title: "UI/blocks/Social/SubscribersList",
  component: SubscribersList,
  decorators: [ChakraUiDecorator],
} as ComponentMeta<typeof SubscribersList>;

const Template: ComponentStory<typeof SubscribersList> = (args) => (
  <div className="w-full text-black">
    <SubscribersList {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  title: "Subscibers",
  users: SubscribersUsersPlaceholder,
};
