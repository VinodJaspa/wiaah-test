import {
  AccountDeletionModal,
  ModalExtendedWrapper,
  ModalButton,
  Button,
} from "@UI";
import { storybookModalsTitle } from "utils";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookModalsTitle + "AccountDeletionModal",
  component: AccountDeletionModal,
} as ComponentMeta<typeof AccountDeletionModal>;

export const Default = () => {
  return (
    <ModalExtendedWrapper>
      <ModalButton>
        <Button>open</Button>
      </ModalButton>
      <AccountDeletionModal />
    </ModalExtendedWrapper>
  );
};
