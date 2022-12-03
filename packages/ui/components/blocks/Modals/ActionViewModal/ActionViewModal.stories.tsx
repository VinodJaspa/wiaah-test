import {
  ActionViewModal,
  ModalExtendedWrapper,
  ModalButton,
  Button,
  useActionViewPopup,
} from "ui";
import { storybookModalsTitle } from "utils";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookModalsTitle + "ActionViewModal",
  component: ActionViewModal,
} as ComponentMeta<typeof ActionViewModal>;

export const Default = () => {
  const { setCurrentActionId } = useActionViewPopup();

  return (
    <>
      <Button onClick={() => setCurrentActionId("1345")}>open</Button>
      <ActionViewModal />
    </>
  );
};
