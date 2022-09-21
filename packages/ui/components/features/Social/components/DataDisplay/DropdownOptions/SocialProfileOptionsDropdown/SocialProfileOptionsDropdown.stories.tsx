import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SocialProfileOptionsDropdown } from "./SocialProfileOptionsDropdown";
import { storybookSocialDataDisplayTitle } from "utils";

export default {
  title: storybookSocialDataDisplayTitle + "SocialProfileOptionsDropdown",
  component: SocialProfileOptionsDropdown,
} as ComponentMeta<typeof SocialProfileOptionsDropdown>;

const template: ComponentStory<typeof SocialProfileOptionsDropdown> = (
  args
) => (
  <SocialProfileOptionsDropdown {...args}>
    <button className="border">open</button>
  </SocialProfileOptionsDropdown>
);

export const Default = template.bind({});
Default.args = {
  profileId: "132",
};
