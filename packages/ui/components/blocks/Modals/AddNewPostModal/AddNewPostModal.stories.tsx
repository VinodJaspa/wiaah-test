import { AddNewPostModal, Button, useNewPost } from "@UI";
import { storybookModalsTitle } from "utils";
import { Meta } from "@storybook/react";

export default {
  title: "UI / Blocks / Modals /AddNewPostModal",
  component: AddNewPostModal,
} as Meta<typeof AddNewPostModal>;

export const Default = () => {
  const { OpenModal } = useNewPost();

  return (
    <>
      <Button onClick={() => OpenModal()}>open</Button>
      <AddNewPostModal />
    </>
  );
};
