import { Meta, StoryFn } from "@storybook/react";
import { SocialReportModal, useSocialReportModal } from "./SocialReportModal";
import { storybookSocialModalsTitle } from "utils";

export default {
  title: "UI / Features /Social /Modals /SocialReportModal",
  component: SocialReportModal,
} as Meta<typeof SocialReportModal>;

const template: StoryFn<typeof SocialReportModal> = (args) => {
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

export const Default = {
  render: template,
  args: {},
};
