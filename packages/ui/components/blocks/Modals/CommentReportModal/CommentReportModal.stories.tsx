import {
  CommentReportModal,
  Button,
  ModalExtendedWrapper,
  ModalButton,
} from "@UI";
import { storybookModalsTitle } from "utils";
import { Meta } from "@storybook/react";

export default {
  title: "UI / Blocks / Modals /CommentReportModal",
  component: CommentReportModal,
} as Meta<typeof CommentReportModal>;

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
