import { RecordVideoModal, Button, useNewsFeedPostPopup } from "@UI";
import { storybookModalsTitle } from "utils";
import { Meta } from "@storybook/react";
import { useDisclouser } from "hooks";

export default {
  title: "UI / Blocks / Modals /RecordVideoModal",
  component: RecordVideoModal,
} as Meta<typeof RecordVideoModal>;

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
