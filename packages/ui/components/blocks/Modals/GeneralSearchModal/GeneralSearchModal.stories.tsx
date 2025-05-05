import {
  GeneralSearchModal,
  Button,
  ModalExtendedWrapper,
  ModalButton,
} from "@UI";
import { storybookModalsTitle } from "utils";
import { Meta } from "@storybook/react";

export default {
  title: "UI / Blocks / Modals /GeneralSearchModal",
  component: GeneralSearchModal,
} as Meta<typeof GeneralSearchModal>;

export const Default = () => {
  return (
    <ModalExtendedWrapper>
      <ModalButton>
        <Button>open</Button>
      </ModalButton>
      <GeneralSearchModal>
        <></>
      </GeneralSearchModal>
    </ModalExtendedWrapper>
  );
};
