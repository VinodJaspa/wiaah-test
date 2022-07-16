import {
  storybookBlocksTitle,
  BookingEventPopup,
  Button,
  ModalExtendedWrapper,
  ModalButton,
} from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookBlocksTitle + "BookingEventPopup",
  component: BookingEventPopup,
} as ComponentMeta<typeof BookingEventPopup>;

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
