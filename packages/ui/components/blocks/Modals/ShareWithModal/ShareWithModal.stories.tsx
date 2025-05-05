import { ShareWithModal, Button, useShareWithModal } from "@UI";
import { storybookModalsTitle } from "utils";
import { Meta } from "@storybook/react";

export default {
  title: "UI / Blocks / Modals /ShareWithModal",
  component: ShareWithModal,
} as Meta<typeof ShareWithModal>;

export const Default = () => {
  const { OpenModal } = useShareWithModal();
  return (
    <>
      <Button onClick={() => OpenModal("12")}>open</Button>
      <ShareWithModal />
    </>
  );
};
