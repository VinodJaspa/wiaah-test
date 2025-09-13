import { AddNewPostModal, Button, useNewPost } from "ui";
import { storybookModalsTitle } from "utils";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  title: "UI / Blocks / Modals /AddNewPostModal",
  component: AddNewPostModal,
} as Meta<typeof AddNewPostModal>;

export const Default = () => {
  const { OpenModal } = useNewPost();
    const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>open</Button>
      <AddNewPostModal />
    </>
  );
};
