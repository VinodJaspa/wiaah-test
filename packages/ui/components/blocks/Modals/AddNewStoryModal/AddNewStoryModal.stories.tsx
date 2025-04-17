import { AddNewStoryModal, Button, useNewStoryModal } from "@UI";
import { storybookModalsTitle } from "utils";
import { Meta } from "@storybook/react";

export default {
  title: "UI / Blocks / Modals /AddNewStoryModal",
  component: AddNewStoryModal,
} as Meta<typeof AddNewStoryModal>;

export const Default = () => {
  const { openNewStoryModal } = useNewStoryModal();

  return (
    <>
      <Button onClick={() => openNewStoryModal()}>open</Button>
      <AddNewStoryModal />
    </>
  );
};
