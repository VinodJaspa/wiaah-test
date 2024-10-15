import { storybookModalsTitle } from "utils";
import { FilterModal, Button } from "@UI";
import { ComponentMeta } from "@storybook/react";
import { useDisclouser } from "hooks";

export default {
  title: storybookModalsTitle + "FilterModal",
  component: FilterModal,
} as ComponentMeta<typeof FilterModal>;

export const Default = () => {
  const { isOpen, handleClose, handleOpen } = useDisclouser();
  return (
    <>
      <Button onClick={handleOpen}>open</Button>
      <FilterModal />
    </>
  );
};
