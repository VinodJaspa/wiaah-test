import { RecordVideoModal, Button, useNewsFeedPostPopup } from "@UI";
import { storybookModalsTitle } from "utils";
import { ComponentMeta } from "@storybook/react";
import { useDisclouser } from "hooks";

export default {
  title: storybookModalsTitle + "RecordVideoModal",
  component: RecordVideoModal,
} as ComponentMeta<typeof RecordVideoModal>;

export const Default = () => {
  const { handleClose, handleOpen, isOpen } = useDisclouser();
  return (
    <>
      <Button onClick={() => handleOpen()}>open</Button>
      <RecordVideoModal
        onOpen={handleOpen}
        isOpen={isOpen}
        onClose={handleClose}
      />
    </>
  );
};
