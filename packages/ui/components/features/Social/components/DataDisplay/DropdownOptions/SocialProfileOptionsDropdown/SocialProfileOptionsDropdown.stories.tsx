import { Meta, StoryFn } from "@storybook/react";
import { SocialProfileOptionsDropdown } from "./SocialProfileOptionsDropdown";
import { storybookSocialDataDisplayTitle } from "utils";

export default {
  title: "UI / Features /Social /Data Display /SocialProfileOptionsDropdown",
  component: SocialProfileOptionsDropdown,
} as Meta<typeof SocialProfileOptionsDropdown>;

const template: StoryFn<typeof SocialProfileOptionsDropdown> = (args) => (
  <SocialProfileOptionsDropdown {...args}>
    <button className="border">open</button>
  </SocialProfileOptionsDropdown>
);

export const Default = {
  render: template,

  args: {
    profileId: "132",
  },
};
