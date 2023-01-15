import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SubscriberCard } from "@UI";
import ChakraUiDecorator from "@UI/SBDecorators/ChakraUiDecorator";
import { SubscribersUsersPlaceholder } from "placeholder";
export default {
  title: "UI/blocks/Social/SubscriberCard",
  component: SubscriberCard,
  decorators: [ChakraUiDecorator],
} as ComponentMeta<typeof SubscriberCard>;

const Template: ComponentStory<typeof SubscriberCard> = (args) => (
  <div className="w-full text-black">
    <SubscriberCard {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  ...SubscribersUsersPlaceholder[0],
};
