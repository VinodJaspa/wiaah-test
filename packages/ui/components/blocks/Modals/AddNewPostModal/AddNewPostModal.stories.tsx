import { AddNewPostModal, Button, useNewPost } from "@UI";
import { storybookModalsTitle } from "utils";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookModalsTitle + "AddNewPostModal",
  component: AddNewPostModal,
} as ComponentMeta<typeof AddNewPostModal>;

export const Default = () => {
  const { OpenModal } = useNewPost();

  return (
    <>
      <Button onClick={() => OpenModal()}>open</Button>
      <AddNewPostModal />
    </>
  );
};
