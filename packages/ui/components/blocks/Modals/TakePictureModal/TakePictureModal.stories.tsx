import { TakePictureModal, Button, useSpecialDaysOpenTimeModal } from "@UI";
import { storybookModalsTitle } from "utils";
import { ComponentMeta } from "@storybook/react";
import { useDisclouser } from "hooks";

export default {
  title: storybookModalsTitle + "TakePictureModal",
  component: TakePictureModal,
} as ComponentMeta<typeof TakePictureModal>;

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
