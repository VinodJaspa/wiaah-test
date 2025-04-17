import { NewMessageModal, Button, useNewMessage } from "@UI";
import { storybookModalsTitle } from "utils";
import { Meta } from "@storybook/react";

export default {
  title: "UI / Blocks / Modals /NewMessageModal",
  component: NewMessageModal,
} as Meta<typeof NewMessageModal>;

export const Default = () => {
  const { openModal } = useNewMessage();
  return (
    <>
      <Button onClick={() => openModal()}>open</Button>
      <NewMessageModal />
    </>
  );
};
