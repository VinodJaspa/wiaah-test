import {
  ActionViewModal,
  ModalExtendedWrapper,
  ModalButton,
  Button,
  useActionViewPopup,
} from "@UI";
import { storybookModalsTitle } from "utils";
import { Meta } from "@storybook/react";

export default {
  title: "UI / Blocks / Modals /ActionViewModal",
  component: ActionViewModal,
} as Meta<typeof ActionViewModal>;

export const Default = () => {
  const { setCurrentActionId } = useActionViewPopup();

  return (
    <>
      <Button onClick={() => setCurrentActionId("1345")}>open</Button>
      <ActionViewModal />
    </>
  );
};
