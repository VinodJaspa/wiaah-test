import { AddNewStoryModal, Button, useNewStoryModal } from "ui";
import { storybookModalsTitle } from "utils";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookModalsTitle + "AddNewStoryModal",
  component: AddNewStoryModal,
} as ComponentMeta<typeof AddNewStoryModal>;

export const Default = () => {
  const { openNewStoryModal } = useNewStoryModal();

  return (
    <>
      <Button onClick={() => openNewStoryModal()}>open</Button>
      <AddNewStoryModal />
    </>
  );
};
