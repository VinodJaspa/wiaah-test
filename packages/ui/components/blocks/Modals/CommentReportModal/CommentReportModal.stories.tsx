import {
  CommentReportModal,
  Button,
  ModalExtendedWrapper,
  ModalButton,
} from "@UI";
import { storybookModalsTitle } from "utils";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookModalsTitle + "CommentReportModal",
  component: CommentReportModal,
} as ComponentMeta<typeof CommentReportModal>;

export const Default = () => {
  return (
    <ModalExtendedWrapper>
      <ModalButton>
        <Button>open</Button>
      </ModalButton>
      <CommentReportModal />
    </ModalExtendedWrapper>
  );
};
