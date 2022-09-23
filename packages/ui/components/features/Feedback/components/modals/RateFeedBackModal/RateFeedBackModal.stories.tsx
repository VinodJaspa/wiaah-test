import { RateFeedBackModal } from "./RateFeedBackModal";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookFeedBackModalsTitle } from "utils";

export default {
  title: storybookFeedBackModalsTitle + "RateFeedBackModal",
  component: RateFeedBackModal,
} as ComponentMeta<typeof RateFeedBackModal>;

const template: ComponentStory<typeof RateFeedBackModal> = (args) => (
  <RateFeedBackModal {...args} />
);

export const Default = template.bind({});
Default.args = {};
