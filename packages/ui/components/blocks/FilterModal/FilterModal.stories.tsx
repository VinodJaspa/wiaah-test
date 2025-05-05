import { storybookModalsTitle } from "utils";
import { FilterModal, Button } from "@UI";
import { Meta } from "@storybook/react";
import { useDisclouser } from "hooks";

export default {
  title: "UI / Blocks / Modals /FilterModal",
  component: FilterModal,
} as Meta<typeof FilterModal>;

export const Default = () => {
  const { isOpen, handleClose, handleOpen } = useDisclouser();
  return (
    <>
      <Button onClick={handleOpen}>open</Button>
      <FilterModal />
    </>
  );
};
