import {
  storybookBlocksTitle,
  BookingEventPopup,
  Button,
  ModalExtendedWrapper,
  ModalButton,
} from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / blocks / BookingEventPopup",
  component: BookingEventPopup,
} as Meta<typeof BookingEventPopup>;

export const EventVariant = () => {
  return (
    <ModalExtendedWrapper modalKey="15">
      <ModalButton>
        <Button>open</Button>
      </ModalButton>
      <BookingEventPopup />
    </ModalExtendedWrapper>
  );
};

export const RentVariant = () => {
  return (
    <ModalExtendedWrapper modalKey="15">
      <ModalButton>
        <Button>open</Button>
      </ModalButton>
      <BookingEventPopup />
    </ModalExtendedWrapper>
  );
};
