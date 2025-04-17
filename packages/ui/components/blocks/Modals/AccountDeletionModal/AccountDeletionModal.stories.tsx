import {
  AccountDeletionModal,
  ModalExtendedWrapper,
  ModalButton,
  Button,
} from "@UI";
import { storybookModalsTitle } from "utils";
import { Meta } from "@storybook/react";

export default {
  title: "UI / Blocks / Modals /AccountDeletionModal",
  component: AccountDeletionModal,
} as Meta<typeof AccountDeletionModal>;

export const Default = () => {
  return (
    <ModalExtendedWrapper>
      <ModalButton>
        <Button>open</Button>
      </ModalButton>
      <AccountDeletionModal onSubmit={() => {}} />
    </ModalExtendedWrapper>
  );
};
