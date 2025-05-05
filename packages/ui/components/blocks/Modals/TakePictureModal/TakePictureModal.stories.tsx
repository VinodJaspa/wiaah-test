import { TakePictureModal, Button, useSpecialDaysOpenTimeModal } from "@UI";
import { storybookModalsTitle } from "utils";
import { Meta } from "@storybook/react";
import { useDisclouser } from "hooks";

export default {
  title: "UI / Blocks / Modals /TakePictureModal",
  component: TakePictureModal,
} as Meta<typeof TakePictureModal>;

export const Default = () => {
  const { handleClose, handleOpen, isOpen } = useDisclouser();
  return (
    <>
      <Button onClick={() => handleOpen()}>open</Button>
      <TakePictureModal
        onOpen={handleOpen}
        isOpen={isOpen}
        onClose={handleClose}
      />
    </>
  );
};
