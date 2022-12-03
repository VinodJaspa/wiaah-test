import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  SocialPostSettingsPopup,
  useSocialPostSettingsPopup,
} from "./SocialPostSettingsPopup";
import { storybookSocialModalsTitle } from "utils";

export default {
  title: storybookSocialModalsTitle + "SocialPostSettingsPopup",
  component: SocialPostSettingsPopup,
} as ComponentMeta<typeof SocialPostSettingsPopup>;

const template: ComponentStory<typeof SocialPostSettingsPopup> = (args) => {
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

export const Default = template.bind({});
Default.args = {};
