import {
  AskForReturnModal,
  Button,
  ModalExtendedWrapper,
  ModalButton,
} from "@UI";
import { storybookModalsTitle } from "utils";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookModalsTitle + "AskForReturnModal",
  component: AskForReturnModal,
} as ComponentMeta<typeof AskForReturnModal>;

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
