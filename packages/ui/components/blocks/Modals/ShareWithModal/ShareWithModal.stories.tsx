import { ShareWithModal, Button, useShareWithModal } from "@UI";
import { storybookModalsTitle } from "utils";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookModalsTitle + "ShareWithModal",
  component: ShareWithModal,
} as ComponentMeta<typeof ShareWithModal>;

export const Default = () => {
  const { ShareWith } = useShareWithModal();
  return (
    <>
      <Button onClick={() => ShareWith("12")}>open</Button>
      <ShareWithModal />
    </>
  );
};
