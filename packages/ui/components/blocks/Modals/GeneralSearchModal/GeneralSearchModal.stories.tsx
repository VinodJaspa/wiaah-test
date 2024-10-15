import {
  GeneralSearchModal,
  Button,
  ModalExtendedWrapper,
  ModalButton,
} from "@UI";
import { storybookModalsTitle } from "utils";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookModalsTitle + "GeneralSearchModal",
  component: GeneralSearchModal,
} as ComponentMeta<typeof GeneralSearchModal>;

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
