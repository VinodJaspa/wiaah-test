import { NewMessageModal, Button, useNewMessage } from "ui";
import { storybookModalsTitle } from "utils";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookModalsTitle + "NewMessageModal",
  component: NewMessageModal,
} as ComponentMeta<typeof NewMessageModal>;

export const Default = () => {
  const { openModal } = useNewMessage();
  return (
    <>
      <Button onClick={() => openModal()}>open</Button>
      <NewMessageModal />
    </>
  );
};
