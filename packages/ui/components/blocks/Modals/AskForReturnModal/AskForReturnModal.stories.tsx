import {
  AskForReturnModal,
  Button,
  ModalExtendedWrapper,
  ModalButton,
} from "@UI";
import { storybookModalsTitle } from "utils";
import { Meta } from "@storybook/react";

export default {
  title: "UI / Blocks / Modals /AskForReturnModal",
  component: AskForReturnModal,
} as Meta<typeof AskForReturnModal>;

export const Default = () => {
  return (
    <ModalExtendedWrapper>
      <ModalButton>
        <Button>open</Button>
      </ModalButton>
      <AskForReturnModal />
    </ModalExtendedWrapper>
  );
};
