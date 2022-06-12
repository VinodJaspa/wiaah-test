import {
  ActionsViewModal,
  ModalExtendedWrapper,
  ModalButton,
  Button,
} from "ui";
import { storybookModalsTitle } from "utils";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookModalsTitle + "ActionsViewModal",
  component: ActionsViewModal,
} as ComponentMeta<typeof ActionsViewModal>;

export const Default = () => {
  return (
    <ModalExtendedWrapper>
      <ModalButton>
        <Button>open</Button>
      </ModalButton>
      <ActionsViewModal />
    </ModalExtendedWrapper>
  );
};
