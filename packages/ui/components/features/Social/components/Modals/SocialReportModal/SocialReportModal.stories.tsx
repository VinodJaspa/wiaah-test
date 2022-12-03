import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SocialReportModal, useSocialReportModal } from "./SocialReportModal";
import { storybookSocialModalsTitle } from "utils";

export default {
  title: storybookSocialModalsTitle + "SocialReportModal",
  component: SocialReportModal,
} as ComponentMeta<typeof SocialReportModal>;

const template: ComponentStory<typeof SocialReportModal> = (args) => {
  const { OpenModal } = useSocialReportModal();

  return (
    <>
      <button onClick={() => OpenModal("135")} className="border-2 p-4">
        {" "}
        open{" "}
      </button>
      <SocialReportModal {...args} />
    </>
  );
};

export const Default = template.bind({});
Default.args = {};
