import { Meta, StoryFn } from "@storybook/react";
import {
  SocialPostSettingsPopup,
  useSocialPostSettingsPopup,
} from "./SocialPostSettingsPopup";
import { storybookSocialModalsTitle } from "utils";

export default {
  title: "UI / Features /Social /Modals /SocialPostSettingsPopup",
  component: SocialPostSettingsPopup,
} as Meta<typeof SocialPostSettingsPopup>;

const template: StoryFn<typeof SocialPostSettingsPopup> = (args) => {
  const { OpenModal } = useSocialPostSettingsPopup();

  return (
    <>
      <button onClick={() => OpenModal("135")} className="border-2 p-4">
        {" "}
        open{" "}
      </button>
      <SocialPostSettingsPopup {...args} />
    </>
  );
};

export const Default = {
  render: template,
  args: {},
};
