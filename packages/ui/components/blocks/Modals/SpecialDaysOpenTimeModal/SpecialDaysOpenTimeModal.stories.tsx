import {
  SpecialDaysOpenTimeModal,
  Button,
  useSpecialDaysOpenTimeModal,
} from "@UI";
import { storybookModalsTitle } from "utils";
import { Meta } from "@storybook/react";

export default {
  title: "UI / Blocks / Modals /SpecialDaysOpenTimeModal",
  component: SpecialDaysOpenTimeModal,
} as Meta<typeof SpecialDaysOpenTimeModal>;

export const Default = () => {
  const { modifiDays } = useSpecialDaysOpenTimeModal();
  return (
    <>
      <Button onClick={() => modifiDays([...Array(3)].map(() => new Date()))}>
        open
      </Button>
      <SpecialDaysOpenTimeModal
        onClearSpeicalDays={() => {}}
        onScheduleComplete={() => {}}
      />
    </>
  );
};
